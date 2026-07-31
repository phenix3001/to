import type { RealSuitcase } from './types';

export const suitcaseModels = [
  {
    id: 'airport-luggage',
    title: { ru: 'Тканевый чемодан', en: 'Fabric suitcase' },
    author: 'Poly by Google',
    license: 'CC-BY 3.0',
    modelUrl: '/models/suitcases/airport-luggage.glb',
    imageUrl: '/images/suitcases/airport-luggage.png',
    sourceUrl: 'https://poly.pizza/m/ezEfa_eupwK',
  },
  {
    id: 'travel-suitcase',
    title: { ru: 'Дорожный чемодан', en: 'Travel suitcase' },
    author: 'J-Toastie',
    license: 'CC-BY 3.0',
    modelUrl: '/models/suitcases/travel-suitcase.glb',
    imageUrl: '/images/suitcases/travel-suitcase.png',
    sourceUrl: 'https://poly.pizza/m/041xs8FnZZ',
  },
  {
    id: 'carry-on',
    title: { ru: 'Чемодан для ручной клади', en: 'Carry-on luggage' },
    author: 'get wilde',
    license: 'CC-BY 3.0',
    modelUrl: '/models/suitcases/carry-on.glb',
    imageUrl: '/images/suitcases/carry-on.png',
    sourceUrl: 'https://poly.pizza/m/axVdRGg-Lbl',
  },
  {
    id: 'modern-suitcase',
    title: { ru: 'Современный чемодан', en: 'Modern suitcase' },
    author: 'smallbigsquare',
    license: 'CC0 1.0',
    modelUrl: '/models/suitcases/modern-suitcase.glb',
    imageUrl: '/images/suitcases/modern-suitcase.png',
    sourceUrl: 'https://poly.pizza/m/7DsKpns9FM',
  },
  {
    id: 'airport-luggage-buckled-sand',
    title: { ru: 'Высокий песочный чемодан', en: 'Tall sand suitcase' },
    author: 'Poly by Google · modified',
    license: 'CC-BY 3.0',
    modelUrl: '/models/suitcases/airport-luggage-buckled-sand.glb',
    imageUrl: '/images/suitcases/airport-luggage-buckled-sand.png',
    sourceUrl: 'https://poly.pizza/m/ezEfa_eupwK',
  },
] satisfies readonly RealSuitcase[];
