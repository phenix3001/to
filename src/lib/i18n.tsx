import { createContext, ReactNode, useContext, useState } from 'react';

export type Language = 'ru' | 'en';

const translations = {
  ru: {
    title: 'Странный аэропорт',
    play: 'Играть',
    achievements: 'Достижения',
    settings: 'Настройки',
    openAchievements: 'Открыть достижения',
    openSettings: 'Открыть настройки',
    investigation: 'Расследование',
    dayOne: 'День 1',
    loadingTextures: 'Загрузка текстур',
    loadingError: 'Не удалось загрузить текстуры',
    retry: 'Попробовать снова',
    gameStarts: 'Работа начинается',
    luggageProgress: 'Выдано чемоданов',
    matchInstruction: 'Выберите чемодан, затем его владельца',
    chooseSuitcaseFirst: 'Сначала выберите чемодан справа',
    correctMatch: 'Верно! Чемодан передан владельцу',
    wrongMatch: 'Этот чемодан не подходит пассажиру',
    groupComplete: 'Группа обслужена. Можно звать следующих пассажиров!',
    elderlyPassenger: 'Пожилой пассажир',
    punkPassenger: 'Пассажирка-панк',
    businessPassenger: 'Деловой пассажир',
    leatherSuitcase: 'Кожаный чемодан',
    stickerSuitcase: 'Чемодан с наклейками',
    blueSuitcase: 'Синий чемодан',
    texturesReady: 'Все текстуры загружены',
    backToDesk: 'Вернуться к столу',
    gameOptions: 'Параметры игры',
    music: 'Музыка',
    sounds: 'Звуки',
    imageQuality: 'Качество изображения',
    standardQuality: 'Стандарт · 1672×941',
    hints: 'Подсказки',
    hintsDescription: 'Подсказки помогут вам по мере прохождения',
    hintsRecommendation: 'Рекомендуем включить во время первого прохождения',
    language: 'Язык',
    notebook: 'Личный блокнот',
    opened: 'Открыто',
    closed: 'Закрыто',
    openedCount: 'Открыто 1 из 4',
    firstStep: 'Первый шаг',
    firstStepDescription: 'Начать первое расследование',
    sharpEye: 'Зоркий глаз',
    sharpEyeDescription: 'Найти важную улику',
    goodMemory: 'Хорошая память',
    goodMemoryDescription: 'Открыть все записи в деле',
    detective: 'Настоящий детектив',
    detectiveDescription: 'Завершить расследование',
  },
  en: {
    title: 'Strange Airport',
    play: 'Play',
    achievements: 'Achievements',
    settings: 'Settings',
    openAchievements: 'Open achievements',
    openSettings: 'Open settings',
    investigation: 'Investigation',
    dayOne: 'Day 1',
    loadingTextures: 'Loading textures',
    loadingError: 'Failed to load textures',
    retry: 'Try again',
    gameStarts: 'Work begins',
    luggageProgress: 'Luggage returned',
    matchInstruction: 'Choose a suitcase, then its owner',
    chooseSuitcaseFirst: 'Choose a suitcase on the right first',
    correctMatch: 'Correct! The luggage was returned to its owner',
    wrongMatch: 'This suitcase does not belong to that passenger',
    groupComplete: 'The group is served. Call the next passengers!',
    elderlyPassenger: 'Elderly passenger',
    punkPassenger: 'Punk passenger',
    businessPassenger: 'Business passenger',
    leatherSuitcase: 'Leather suitcase',
    stickerSuitcase: 'Sticker suitcase',
    blueSuitcase: 'Blue suitcase',
    texturesReady: 'All textures are loaded',
    backToDesk: 'Return to the desk',
    gameOptions: 'Game options',
    music: 'Music',
    sounds: 'Sounds',
    imageQuality: 'Image quality',
    standardQuality: 'Standard · 1672×941',
    hints: 'Hints',
    hintsDescription: 'Hints will help you as you progress',
    hintsRecommendation: 'Recommended for your first playthrough',
    language: 'Language',
    notebook: 'Personal notebook',
    opened: 'Unlocked',
    closed: 'Locked',
    openedCount: 'Unlocked 1 of 4',
    firstStep: 'First step',
    firstStepDescription: 'Start the first investigation',
    sharpEye: 'Sharp eye',
    sharpEyeDescription: 'Find an important clue',
    goodMemory: 'Good memory',
    goodMemoryDescription: 'Open every case note',
    detective: 'True detective',
    detectiveDescription: 'Complete the investigation',
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  text: typeof translations.ru | typeof translations.en;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return localStorage.getItem('game-language') === 'en' ? 'en' : 'ru';
  });

  function setLanguage(value: Language) {
    localStorage.setItem('game-language', value);
    setLanguageState(value);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, text: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
