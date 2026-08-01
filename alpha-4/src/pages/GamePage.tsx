import { CSSProperties } from 'react';
import { Link } from 'wouter';
import { CharacterHorrorFilter } from '../components/CharacterHorrorFilter';
import { RealSuitcaseCard } from '../components/RealSuitcaseCard';
import { useGameSettings } from '../lib/GameSettingsContext';
import { useLanguage } from '../lib/i18n';
import { passengers } from '../lib/passengers';
import { realSuitcases } from '../lib/realSuitcases';
import '../styles/game.css';

export function GamePage() {
  const { language, text } = useLanguage();
  const { hintsEnabled } = useGameSettings();

  function characterStyle(index: number) {
    return {
      '--character-hue': `${(index * 137.5) % 360}`,
      '--character-tilt': `${(index % 5) * 1.5 - 3}deg`,
    } as CSSProperties;
  }

  return (
    <main className="asset-gallery">
      <CharacterHorrorFilter />
      <header className="asset-gallery__header">
        <Link href="/">← {language === 'ru' ? 'Назад' : 'Back'}</Link>
        <h1>{language === 'ru' ? 'Персонажи и чемоданы' : 'Characters and suitcases'}</h1>
      </header>

      {hintsEnabled && (
        <p className="asset-gallery__hint" role="note">{text.luggageHint}</p>
      )}

      <section>
        <h2>{language === 'ru' ? 'Персонажи' : 'Characters'}</h2>
        <div className="character-grid">
          {passengers.map((passenger, index) => (
            <figure
              key={passenger.id}
              className="character-card"
              data-variant={index % 6}
              style={characterStyle(index)}
            >
              <b>{String(index + 1).padStart(2, '0')}</b>
              <img src={passenger.image} alt={passenger.name[language]} />
              <figcaption>{passenger.name[language]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="luggage-gallery">
        <h2>
          {language === 'ru'
            ? `Багаж · ${realSuitcases.length} моделей · 3D и 2D`
            : `Luggage · ${realSuitcases.length} models · 3D and 2D`}
        </h2>
        <div className="real-suitcase-grid">
          {realSuitcases.map((suitcase, index) => (
            <RealSuitcaseCard
              key={suitcase.id}
              language={language}
              number={index + 1}
              suitcase={suitcase}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
