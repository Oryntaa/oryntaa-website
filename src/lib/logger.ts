import 'server-only';

/**
 * Structured logger over stdout (Vercel captures stdout as structured logs) — LOGGING_MONITORING §1.
 * JSON lines in production, pretty in dev. `logger.child({ action, cid })` binds context.
 * Values whose keys match secret patterns are redacted everywhere; email addresses are redacted
 * in error-level payloads. `console.*` is banned outside this module (CODING_STANDARDS §8).
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  cid?: string;
  action?: string;
}

type LogData = Record<string, unknown>;

interface Logger {
  debug: (event: string, data?: LogData) => void;
  info: (event: string, data?: LogData) => void;
  warn: (event: string, data?: LogData) => void;
  error: (event: string, data?: LogData) => void;
  child: (context: LogContext) => Logger;
}

const REDACT_KEY = /key|secret|salt|token|password/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const SHORT_SHA = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'local').slice(0, 7);
const IS_PROD = process.env.NODE_ENV === 'production';

function redact(value: unknown, level: LogLevel): unknown {
  if (typeof value === 'string') {
    return level === 'error' ? value.replace(EMAIL, '[redacted-email]') : value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => redact(item, level));
  }
  if (value !== null && typeof value === 'object') {
    const result: LogData = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = REDACT_KEY.test(key) ? '[redacted]' : redact(val, level);
    }
    return result;
  }
  return value;
}

function createLogger(context: LogContext): Logger {
  function log(level: LogLevel, event: string, data?: LogData): void {
    const record: LogData = {
      level,
      event,
      cid: context.cid ?? null,
      action: context.action ?? null,
      sha: SHORT_SHA,
      ...(data ? (redact(data, level) as LogData) : {}),
    };
    const line = IS_PROD ? JSON.stringify(record) : `[${level}] ${event} ${JSON.stringify(record)}`;
    if (level === 'error') {
      console.error(line);
    } else if (level === 'warn') {
      console.warn(line);
    } else {
      console.log(line);
    }
  }

  return {
    debug: (event, data) => {
      log('debug', event, data);
    },
    info: (event, data) => {
      log('info', event, data);
    },
    warn: (event, data) => {
      log('warn', event, data);
    },
    error: (event, data) => {
      log('error', event, data);
    },
    child: (childContext) => createLogger({ ...context, ...childContext }),
  };
}

export const logger: Logger = createLogger({});
