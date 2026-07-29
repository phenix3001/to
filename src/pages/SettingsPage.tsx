import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';
import {
  applyGraphicsQuality,
  GraphicsQuality,
  readGraphicsQuality,
} from '../lib/graphicsQuality';
import '../styles/settings.css';

export function SettingsPage() {
  const { language, setLanguage, text } = useLanguage();
  const [music, setMusic] = useState(65);
  const [sounds, setSounds] = useState(80);
  const [hints, setHints] = useState(true);
  const [graphicsQuality, setGraphicsQuality] = useState(readGraphicsQuality);

  function changeGraphicsQuality(value: GraphicsQuality) {
    setGraphicsQuality(value);
    applyGraphicsQuality(value);
  }

  return (
    <main className="settings-page">
      <section className="settings-panel">
        <header>
          <p>{text.gameOptions}</p>
          <h1>{text.settings}</h1>
        </header>

        <div className="language-setting">
          <span>{text.language}</span>
          <div className="language-setting__buttons">
            <button
              type="button"
              className={language === 'ru' ? 'is-active' : ''}
              onClick={() => setLanguage('ru')}
            >
              Русский
            </button>
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </div>

        <label className="setting-row">
          <span>{text.music} <strong>{music}%</strong></span>
          <input
            type="range"
            min="0"
            max="100"
            value={music}
            onChange={(event) => setMusic(Number(event.target.value))}
          />
        </label>

        <label className="setting-row">
          <span>{text.sounds} <strong>{sounds}%</strong></span>
          <input
            type="range"
            min="0"
            max="100"
            value={sounds}
            onChange={(event) => setSounds(Number(event.target.value))}
          />
        </label>

        <div className="language-setting">
          <span>{text.imageQuality}</span>
          <div className="language-setting__buttons">
            <button
              type="button"
              className={graphicsQuality === 'standard' ? 'is-active' : ''}
              onClick={() => changeGraphicsQuality('standard')}
            >
              {text.standardQuality}
            </button>
            <button
              type="button"
              className={graphicsQuality === '2k' ? 'is-active' : ''}
              onClick={() => changeGraphicsQuality('2k')}
            >
              2K · 2560×1440
            </button>
          </div>
        </div>

        <label className="setting-toggle">
          <span>
            {text.hints}
            <small>{text.hintsDescription}</small>
            <em>{text.hintsRecommendation}</em>
          </span>
          <input
            type="checkbox"
            checked={hints}
            onChange={(event) => setHints(event.target.checked)}
          />
        </label>

        <Link href="/" className="settings-panel__back">← {text.backToDesk}</Link>
      </section>
    </main>
  );
}
