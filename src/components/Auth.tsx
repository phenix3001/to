import { FormEvent, useState } from 'react';
import { useAuth } from '../lib/auth';
import { useGameProgress } from '../lib/GameProgressContext';
import { useLanguage } from '../lib/i18n';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import '../styles/auth.css';

const copy = {
  ru: {
    eyebrow: 'Аккаунт',
    title: 'Сохранение прогресса',
    description: 'Создайте аккаунт, чтобы продолжить игру на другом устройстве.',
    email: 'Электронная почта',
    password: 'Пароль — минимум 6 символов',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    hasAccount: 'Уже есть аккаунт? Войти',
    needsAccount: 'Нет аккаунта? Зарегистрироваться',
    signedIn: 'Вы вошли как',
    signOut: 'Выйти',
    created: 'Аккаунт создан. Прогресс сохранён.',
    confirm: 'Проверьте почту, затем войдите в аккаунт.',
    failed: 'Не получилось. Проверьте данные и попробуйте снова.',
    missingSetup: 'Облачное сохранение пока не подключено.',
    syncing: 'Сохраняем прогресс…',
    synced: 'Прогресс сохранён в аккаунте',
    syncError: 'Нет связи с облаком. Локальная копия сохранена.',
  },
  en: {
    eyebrow: 'Account',
    title: 'Progress saving',
    description: 'Create an account to continue playing on another device.',
    email: 'Email',
    password: 'Password — at least 6 characters',
    signIn: 'Sign in',
    signUp: 'Create account',
    hasAccount: 'Already have an account? Sign in',
    needsAccount: 'No account? Create one',
    signedIn: 'Signed in as',
    signOut: 'Sign out',
    created: 'Account created. Progress saved.',
    confirm: 'Check your email, then sign in.',
    failed: 'Something went wrong. Check your details and try again.',
    missingSetup: 'Cloud saving is not connected yet.',
    syncing: 'Saving progress…',
    synced: 'Progress saved to your account',
    syncError: 'Cloud is unavailable. A local copy is safe.',
  },
};

export function Auth() {
  const { isLoading, user } = useAuth();
  const { syncStatus } = useGameProgress();
  const { language } = useLanguage();
  const text = copy[language];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(data.session ? text.created : text.confirm);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch {
      setMessage(text.failed);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(text.failed);
    setBusy(false);
  }

  function switchMode() {
    setMode((current) => current === 'signin' ? 'signup' : 'signin');
    setMessage('');
  }

  const syncMessage = syncStatus === 'syncing'
    ? text.syncing
    : syncStatus === 'error' ? text.syncError : text.synced;

  return (
    <section className="account-settings" aria-labelledby="account-title">
      <p>{text.eyebrow}</p>
      <h2 id="account-title">{text.title}</h2>
      {!isSupabaseConfigured ? (
        <span className="account-settings__message">{text.missingSetup}</span>
      ) : isLoading ? (
        <span className="account-settings__message">{text.syncing}</span>
      ) : user ? (
        <div className="account-settings__session">
          <span>{text.signedIn}</span>
          <strong>{user.email}</strong>
          <small data-status={syncStatus}>{syncMessage}</small>
          <button type="button" onClick={signOut} disabled={busy}>{text.signOut}</button>
        </div>
      ) : (
        <>
          <span className="account-settings__description">{text.description}</span>
          <form className="account-settings__form" onSubmit={handleSubmit}>
            <input
              type="email"
              autoComplete="email"
              placeholder={text.email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              placeholder={text.password}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
            <button type="submit" disabled={busy}>
              {busy ? '…' : mode === 'signup' ? text.signUp : text.signIn}
            </button>
          </form>
          {message && <span className="account-settings__message" role="status">{message}</span>}
          <button type="button" className="account-settings__switch" onClick={switchMode}>
            {mode === 'signup' ? text.hasAccount : text.needsAccount}
          </button>
        </>
      )}
    </section>
  );
}
