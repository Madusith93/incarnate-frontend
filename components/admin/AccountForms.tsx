'use client';

import { startTransition, useActionState } from 'react';
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';
import { changePasswordAction, loginAction } from '@/app/admin/actions';
import type { FormState } from '@/lib/cms/forms';

const EMPTY: FormState = {};

/** Submit without React's automatic form reset, so a failed attempt keeps what was typed. */
function submitter(run: (fd: FormData) => void) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => run(fd));
  };
}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, EMPTY);
  return (
    <form onSubmit={submitter(action)}>
      <h2 className="ad-h1" style={{ fontSize: 22, marginBottom: 6 }}>Sign in</h2>
      <p className="ad-sub" style={{ marginBottom: 22 }}>Use the email and password for this content manager.</p>
      {state.error && <div className="ad-banner err" role="alert"><TriangleAlert size={16} /> {state.error}</div>}
      <label className="ad-label" htmlFor="email" style={{ display: 'block', paddingTop: 0, marginBottom: 6 }}>Email</label>
      <input id="email" name="email" type="email" className="ad-input" style={{ maxWidth: 'none' }} autoComplete="username" required autoFocus />
      <label className="ad-label" htmlFor="password" style={{ display: 'block', paddingTop: 0, margin: '16px 0 6px' }}>Password</label>
      <input id="password" name="password" type="password" className="ad-input" style={{ maxWidth: 'none' }} autoComplete="current-password" required />
      <button type="submit" className="ad-btn ad-btn-primary" style={{ width: '100%', marginTop: 22, padding: '10px 14px' }} disabled={pending}>
        {pending && <Loader2 size={15} className="animate-spin" />} {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

function Row({ id, label, hint, autoComplete, error }: { id: string; label: string; hint?: string; autoComplete: string; error?: string }) {
  return (
    <div className="ad-row">
      <label className="ad-label" htmlFor={id}>{label}{hint && <small>{hint}</small>}</label>
      <div>
        <input id={id} name={id} type="password" className="ad-input" autoComplete={autoComplete} required aria-invalid={!!error} />
        {error && <div className="ad-err" role="alert">{error}</div>}
      </div>
    </div>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, EMPTY);
  const e = state.fieldErrors ?? {};
  return (
    <form onSubmit={submitter(action)} className="ad-card">
      <div className="ad-card-body" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <Row id="current" label="Current password" autoComplete="current-password" error={e.current} />
        <Row id="next" label="New password" hint="At least 10 characters." autoComplete="new-password" error={e.next} />
        <Row id="confirm" label="Repeat new password" autoComplete="new-password" error={e.confirm} />
      </div>
      <div className="ad-card-head" style={{ borderTop: '1px solid var(--line)', borderBottom: 0 }}>
        <button type="submit" className="ad-btn ad-btn-primary" disabled={pending}>{pending ? 'Saving…' : 'Change password'}</button>
        {state.ok && <span className="ad-status-msg ok"><CheckCircle2 size={15} style={{ verticalAlign: '-3px' }} /> {state.message}</span>}
        {state.error && !state.ok && <span className="ad-status-msg err">{state.error}</span>}
      </div>
    </form>
  );
}
