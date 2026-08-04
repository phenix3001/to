import { useState } from 'react';
import { Link } from 'wouter';
import { useGameSettings } from '../lib/GameSettingsContext';
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
  const {
    hintsEnabled,
    setHintsEnabled,
    mobileLayoutEnabled,
    setMobileLayoutEnabled,
    showCatalogBeforeGame,
    setShowCatalogBeforeGame,
    interfaceHidden,
    setInterfaceHidden,
  } = useGameSettings();
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
          checked={hintsEnabled}
          onChange={(event) => setHintsEnabled(event.target.checked)}
        />
      </label>

      <label className="setting-toggle">
        <span>
          {text.mobileVersion}
          <small>{text.mobileVersionDescription}</small>
        </span>
        <input
          type="checkbox"
          checked={mobileLayoutEnabled}
          onChange={(event) => setMobileLayoutEnabled(event.target.checked)}
        />
      </label>

      <label className="setting-toggle">
        <span>
          {text.catalogBeforeGame}
          <small>{text.catalogBeforeGameDescription}</small>
        </span>
        <input
          type="checkbox"
          checked={showCatalogBeforeGame}
          onChange={(event) => setShowCatalogBeforeGame(event.target.checked)}
        />
      </label>

      <label className="setting-toggle">
        <span>
          {text.hideGameInterface}
          <small>{text.hideGameInterfaceDescription}</small>
        </span>
        <input
          type="checkbox"
          checked={interfaceHidden}
          onChange={(event) => setInterfaceHidden(event.target.checked)}
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
