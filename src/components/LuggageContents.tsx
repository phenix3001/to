import { Language } from '../lib/i18n';
import { getHouseholdItems } from '../lib/luggage/householdItems';
import { usePrefersReducedMotion } from '../lib/reducedMotion';
import { hasWebGLSupport } from '../lib/webgl';

interface LuggageContentsProps {
  id: string;
  isOpen: boolean;
  language: Language;
  number: number;
}

export function LuggageContents({
  id,
  isOpen,
  language,
  number,
}: LuggageContentsProps) {
  const items = getHouseholdItems(number);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div id={id} className="luggage-contents" aria-hidden={!isOpen}>
      <b>{language === 'ru' ? 'Внутри' : 'Inside'}</b>
      <ul>
        {isOpen && items.map((item) => (
          <li key={item.id}>
            {hasWebGLSupport() ? (
              <model-viewer
                src={item.modelUrl}
                poster={item.imageUrl}
                alt={item.label[language]}
                auto-rotate={prefersReducedMotion ? undefined : true}
                shadow-intensity="1"
                exposure="1"
                loading="lazy"
              />
            ) : (
              <img
                src={item.imageUrl}
                alt={item.label[language]}
                loading="lazy"
              />
            )}
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              title={`${item.author} · ${item.license}`}
            >
              {item.label[language]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
