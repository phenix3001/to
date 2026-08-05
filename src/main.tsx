import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './lib/auth.tsx';
import { GameProgressProvider } from './lib/GameProgressContext.tsx';
import { GameSettingsProvider } from './lib/GameSettingsContext.tsx';
import { LanguageProvider } from './lib/i18n.tsx';
import { VisitFlowProvider } from './lib/VisitFlowContext.tsx';
import { applyGraphicsQuality, readGraphicsQuality } from './lib/graphicsQuality.ts';
import './index.css';
import './styles/interface-hidden.css';
import './styles/mobile.css';

applyGraphicsQuality(readGraphicsQuality());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <GameSettingsProvider>
        <AuthProvider>
          <GameProgressProvider>
            <VisitFlowProvider>
              <App />
            </VisitFlowProvider>
          </GameProgressProvider>
        </AuthProvider>
      </GameSettingsProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
