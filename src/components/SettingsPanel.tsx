import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';
import {
  applyGraphicsQuality,
  GraphicsQuality,
  readGraphicsQuality,
} from '../lib/graphicsQuality';
import { Auth } from './Auth';

interface SettingsPanelProps {
  onContinue?: () => void;
}

export function SettingsPanel({ onContinue }: SettingsPanelProps) {
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
    <section className="settings-panel">
      {onContinue && (
        <Link href="/" className="settings-panel__top-menu">
          ← {language === 'ru' ? 'Главное меню' : 'Main menu'}
        </Link>
      )}

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

      {!onContinue && <Auth />}

      <div className="settings-panel__actions">
        {onContinue ? (
          <button type="button" className="settings-panel__back" onClick={onContinue}>
            ← {language === 'ru' ? 'Продолжить игру' : 'Continue game'}
          </button>
        ) : (
          <Link href="/" className="settings-panel__back">← {text.backToDesk}</Link>
        )}
      </div>
    </section>
  );
}
