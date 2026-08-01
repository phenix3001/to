import { CharacterHitbox, LocalizedText } from './investigationTypes';
import { getCharacterHitbox } from './characterHitboxes';

export type PassengerId = `passenger-${string}`;

interface PassengerDefinition {
  id: PassengerId;
  name: LocalizedText;
}

export interface Passenger extends PassengerDefinition {
  id: PassengerId;
  image: string;
  hitbox: CharacterHitbox;
}

const images = import.meta.glob<string>(
  '../assets/characters/passenger-*.png',
  { eager: true, import: 'default', query: '?url' },
);

const definitions: PassengerDefinition[] = [
  { id: 'passenger-41', name: { ru: 'Винсент Нокс', en: 'Vincent Knox' } },
  { id: 'passenger-42', name: { ru: 'Вивьен Блэк', en: 'Vivienne Black' } },
  { id: 'passenger-43', name: { ru: 'Гектор Роу', en: 'Hector Rowe' } },
  { id: 'passenger-44', name: { ru: 'Арчибальд Кейн', en: 'Archibald Kane' } },
  { id: 'passenger-45', name: { ru: 'Матео Ривера', en: 'Mateo Rivera' } },
];

export const passengers: Passenger[] = definitions.map((definition, index) => {
  const { id } = definition;
  const imagePath = `../assets/characters/${id}.png`;
  const image = images[imagePath];
  if (!image) throw new Error(`Missing character texture: ${imagePath}`);

  return {
    ...definition,
    id,
    image,
    hitbox: getCharacterHitbox(index),
  };
});

export const passengerTextureUrls = passengers.map(({ image }) => image);
