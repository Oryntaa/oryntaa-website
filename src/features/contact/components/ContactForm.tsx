'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import Link from 'next/link';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';

import {
  CONTACT_SERVICE_OPTIONS,
  PROJECT_BUDGET_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  PROJECT_TIMELINE_OPTIONS,
} from '@/config/constants';
import { routes } from '@/config/routes';

import { clientEnv } from '@/lib/env';
import { cn } from '@/lib/utils/cn';

import { contactPage } from '@/content/contact-page';

import { submitLead } from '../actions';
import { type LeadResult } from '../schema';

type RouteValue = (typeof contactPage.routes)[number]['value'];

interface ContactFormProps {
  /** Preset route from `?intent=`; `modernization` maps to a project + scaling stage. */
  presetRoute: RouteValue;
  presetStage: string | undefined;
  intent: string | undefined;
  sourcePath: string;
  email: string;
}

const fieldWrap = 'flex flex-col gap-2';
const labelClass = 'text-body-sm text-ink font-medium';
const inputClass =
  'border-line bg-surface text-body text-ink focus-visible:border-accent focus-visible:outline-accent rounded-md border px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-1';
const errorClass = 'text-body-sm text-accent-text';

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
    </label>
  );
}

export function ContactForm({
  presetRoute,
  presetStage,
  intent,
  sourcePath,
  email,
}: ContactFormProps): React.JSX.Element {
  const [state, formAction, pending] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null,
  );
  const [route, setRoute] = useState<RouteValue>(presetRoute);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [stepError, setStepError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());

  const isProject = route === 'project';
  const serverErrors = state !== null && !state.ok ? state.fieldErrors : undefined;
  const siteKey = clientEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Reset to step 1 when the route changes.
  useEffect(() => {
    setStep(1);
  }, [route]);

  const errorMessage = useMemo(() => {
    if (state === null || state.ok) return null;
    if (state.code === 'CHALLENGE') return 'Please complete the verification and try again.';
    if (state.code === 'UNEXPECTED') return contactPage.error.body;
    return null;
  }, [state]);

  if (state?.ok === true) {
    return (
      <div className="border-line bg-surface flex flex-col items-start gap-4 rounded-xl border p-8 md:p-12">
        <h2 className="font-display text-display-sm text-ink">{contactPage.success.title}</h2>
        <p className="text-body-lg text-ink-muted max-w-xl">{contactPage.success.body}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href={routes.home}
            className="border-line text-body-sm text-ink hover:border-ink-muted rounded-md border px-5 py-2.5 font-medium"
          >
            Return home
          </Link>
          <Link
            href={routes.work}
            className="bg-accent text-accent-contrast text-body-sm rounded-md px-5 py-2.5 font-medium"
          >
            View our work
          </Link>
        </div>
      </div>
    );
  }

  function onNext(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    if (form === null) return;
    const data = new FormData(form);
    const rawName = data.get('fullName');
    const rawEmail = data.get('email');
    const name = typeof rawName === 'string' ? rawName.trim() : '';
    const mail = typeof rawEmail === 'string' ? rawEmail.trim() : '';
    if (name.length < 2) {
      setStepError('Please enter your name.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      setStepError('Enter a valid email.');
      return;
    }
    setStepError(null);
    setStep(2);
  }

  const showFinal = !isProject || step === 2;

  return (
    <form id="contact-form" action={formAction} className="flex flex-col gap-8">
      {/* Route selector */}
      <fieldset className="flex flex-col gap-3">
        <legend className={cn(labelClass, 'mb-2')}>What brings you here?</legend>
        <div className="flex flex-wrap gap-2">
          {contactPage.routes.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={route === option.value}
              onClick={() => {
                setRoute(option.value);
              }}
              className={cn(
                'duration-base focus-visible:outline-accent text-body-sm rounded-full border px-4 py-2 font-mono transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                route === option.value
                  ? 'border-accent bg-accent text-accent-contrast'
                  : 'border-line text-ink-muted hover:border-ink-muted hover:text-ink',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Hidden context + spam traps */}
      <input type="hidden" name="route" value={route} />
      <input type="hidden" name="sourcePath" value={sourcePath} />
      <input type="hidden" name="ts" value={mountedAt.current} />
      {intent !== undefined ? <input type="hidden" name="intent" value={intent} /> : null}
      <input type="hidden" name="turnstileToken" value={token} />
      {/* Honeypot — visually hidden, must stay empty */}
      <div aria-hidden className="sr-only">
        <label htmlFor="hp">Do not fill this field</label>
        <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Step 1 — basics (kept mounted so values submit even on step 2) */}
      <div hidden={isProject && step === 2} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className={fieldWrap}>
            <Label htmlFor="fullName">Name</Label>
            <input
              id="fullName"
              name="fullName"
              className={inputClass}
              autoComplete="name"
              required
            />
            {serverErrors?.fullName !== undefined ? (
              <span className={errorClass}>{serverErrors.fullName}</span>
            ) : null}
          </div>
          <div className={fieldWrap}>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              autoComplete="email"
              required
            />
            {serverErrors?.email !== undefined ? (
              <span className={errorClass}>{serverErrors.email}</span>
            ) : null}
          </div>
          <div className={fieldWrap}>
            <Label htmlFor="company">Company (optional)</Label>
            <input id="company" name="company" className={inputClass} autoComplete="organization" />
          </div>
          {isProject ? (
            <div className={fieldWrap}>
              <Label htmlFor="country">Country (optional)</Label>
              <input
                id="country"
                name="country"
                className={inputClass}
                autoComplete="country-name"
              />
            </div>
          ) : null}
        </div>
        {isProject && step === 1 ? (
          <div className="flex flex-col gap-2">
            {stepError !== null ? <span className={errorClass}>{stepError}</span> : null}
            <button
              type="button"
              onClick={onNext}
              className="bg-accent text-accent-contrast focus-visible:outline-accent w-fit rounded-md px-6 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>

      {/* Step 2 (project) / details — services, stage, timeline, budget */}
      {isProject ? (
        <div hidden={step === 1} className="grid gap-6 sm:grid-cols-2">
          <fieldset className="flex flex-col gap-3 sm:col-span-2">
            <legend className={labelClass}>Which services do you need?</legend>
            <div className="flex flex-wrap gap-2">
              {CONTACT_SERVICE_OPTIONS.map((service) => (
                <label key={service} className="cursor-pointer">
                  <input type="checkbox" name="services" value={service} className="peer sr-only" />
                  <span className="border-line text-body-sm text-ink-muted peer-checked:border-accent peer-checked:text-accent-text peer-checked:bg-accent/5 peer-focus-visible:outline-accent inline-flex items-center gap-2 rounded-full border px-3 py-1.5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                    {service}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={fieldWrap}>
            <Label htmlFor="stage">Stage</Label>
            <select id="stage" name="stage" defaultValue={presetStage ?? ''} className={inputClass}>
              <option value="">Select…</option>
              {PROJECT_STAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={fieldWrap}>
            <Label htmlFor="timeline">Timeline</Label>
            <select id="timeline" name="timeline" defaultValue="" className={inputClass}>
              <option value="">Select…</option>
              {PROJECT_TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={fieldWrap}>
            <Label htmlFor="budget">Budget (optional)</Label>
            <select id="budget" name="budget" defaultValue="" className={inputClass}>
              <option value="">Select…</option>
              {PROJECT_BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {/* Final block — message, consent, turnstile, submit */}
      <div hidden={!showFinal} className="flex flex-col gap-6">
        <div className={fieldWrap}>
          <Label htmlFor="message">Message</Label>
          <textarea id="message" name="message" rows={5} className={inputClass} required />
          {serverErrors?.message !== undefined ? (
            <span className={errorClass}>{serverErrors.message}</span>
          ) : null}
        </div>

        <label className="text-body-sm text-ink-muted flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            value="true"
            className="accent-accent mt-1"
            required
          />
          <span>
            I agree to Oryntaa contacting me about my enquiry and to the processing of my details.
          </span>
        </label>
        {serverErrors?.consent !== undefined ? (
          <span className={errorClass}>{serverErrors.consent}</span>
        ) : null}

        {siteKey !== undefined ? (
          <Turnstile
            siteKey={siteKey}
            onSuccess={(value) => {
              setToken(value);
            }}
            options={{ theme: 'light' }}
          />
        ) : null}

        {errorMessage !== null ? (
          <p className={errorClass}>
            {errorMessage}{' '}
            {state !== null && state.code === 'UNEXPECTED' ? (
              <a href={`mailto:${email}`} className="underline underline-offset-4">
                {email}
              </a>
            ) : null}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-accent-contrast focus-visible:outline-accent w-fit rounded-md px-6 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
