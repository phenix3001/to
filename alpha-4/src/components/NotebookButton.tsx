import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';

export function NotebookButton() {
  const { text } = useLanguage();

  return (
    <Link
      href="/achievements"
      className="notebook-button"
      aria-label={text.notebook}
    >
      <span className="object-label">{text.notebook}</span>
    </Link>
  );
}
