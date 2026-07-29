import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';

export function MagnifyingGlassButton() {
  const { text } = useLanguage();

  return (
    <Link href="/game" className="magnifier" aria-label={text.play}>
      <span className="object-label">{text.play}</span>
    </Link>
  );
}
