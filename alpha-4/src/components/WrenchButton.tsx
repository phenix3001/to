import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';

export function WrenchButton() {
  const { text } = useLanguage();

  return (
    <Link href="/settings" className="wrench-button" aria-label={text.openSettings}>
      <span className="object-label">{text.settings}</span>
    </Link>
  );
}
