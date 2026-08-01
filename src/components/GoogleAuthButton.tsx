import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface GoogleAuthButtonProps {
  disabled: boolean;
  label: string;
  onError: () => void;
}

export function GoogleAuthButton({
  disabled,
  label,
  onError,
}: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/settings`,
      },
    });
    if (error) {
      setLoading(false);
      onError();
    }
  }

  return (
    <button
      type="button"
      className="account-settings__google"
      onClick={signIn}
      disabled={disabled || loading}
    >
      <b aria-hidden="true">G</b>
      {loading ? '…' : label}
    </button>
  );
}
