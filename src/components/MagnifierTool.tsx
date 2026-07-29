import magnifierUrl from '../assets/level-one/magnifier.png';
import { Language } from '../lib/i18n';

interface MagnifierToolProps {
  active: boolean;
  language: Language;
  onToggle: () => void;
}

export function MagnifierTool({ active, language, onToggle }: MagnifierToolProps) {
  return (
    <button
      type="button"
      className={`magnifier-tool${active ? ' is-active' : ''}`}
      onClick={onToggle}
      aria-pressed={active}
    >
      <img src={magnifierUrl} alt="" draggable={false} />
      <span>{active
        ? (language === 'ru' ? 'Лупа в руке' : 'Magnifier equipped')
        : (language === 'ru' ? 'Взять лупу' : 'Take magnifier')}
      </span>
    </button>
  );
}
