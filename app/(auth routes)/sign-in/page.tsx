'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientLogin } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignIn.module.css';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const user = await clientLogin({ email, password });
      setUser(user);
      router.replace('/profile');
    } catch {
      setError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={onSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input}
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input}
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}