import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './lib/auth.tsx';
import { GameProgressProvider } from './lib/GameProgressContext.tsx';
import { LanguageProvider } from './lib/i18n.tsx';
import { applyGraphicsQuality, readGraphicsQuality } from './lib/graphicsQuality.ts';
import './index.css';

applyGraphicsQuality(readGraphicsQuality());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <GameProgressProvider>
          <App />
        </GameProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
