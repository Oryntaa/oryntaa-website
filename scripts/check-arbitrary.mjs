// check:arbitrary — fails on banned Tailwind arbitrary values inside `className`
// (CODING_STANDARDS §7). Only the `data-[...]` / `aria-[...]` variants are whitelisted.
// If a value is missing, add a design token in styles/globals.css `@theme` first.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const classNameRe =
  /className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{'([^']*)'\}|\{"([^"]*)"\})/g;
const bracketRe = /(?:data-|aria-)?\[[^\]]*\]/g;

const violations = [];
for (const file of walk(SRC)) {
  const source = readFileSync(file, 'utf8');
  let match;
  while ((match = classNameRe.exec(source)) !== null) {
    const classes = match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? '';
    for (const token of classes.match(bracketRe) ?? []) {
      if (token.startsWith('data-[') || token.startsWith('aria-[')) continue;
      violations.push(`  ${file.slice(ROOT.length)}: ${token}`);
    }
  }
}

if (violations.length > 0) {
  console.error('check:arbitrary — banned arbitrary values in className (CODING_STANDARDS §7):');
  console.error(violations.join('\n'));
  process.exit(1);
}

console.log('check:arbitrary ✓ no arbitrary className values');
