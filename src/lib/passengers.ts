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
  { id: 'passenger-01', name: { ru: 'Винсент Нокс', en: 'Vincent Knox' } },
  { id: 'passenger-02', name: { ru: 'Вивьен Блэк', en: 'Vivienne Black' } },
  { id: 'passenger-03', name: { ru: 'Гектор Роу', en: 'Hector Rowe' } },
  { id: 'passenger-04', name: { ru: 'Арчибальд Кейн', en: 'Archibald Kane' } },
  { id: 'passenger-05', name: { ru: 'Матео Ривера', en: 'Mateo Rivera' } },
  { id: 'passenger-06', name: { ru: 'Новый пассажир', en: 'New Passenger' } },
  { id: 'passenger-07', name: { ru: 'Патрик Бейтман', en: 'Patrick Bateman' } },
  { id: 'passenger-08', name: { ru: 'Хацунэ Мику', en: 'Hatsune Miku' } },
  { id: 'passenger-09', name: { ru: 'Виктор Стоун', en: 'Victor Stone' } },
  { id: 'passenger-10', name: { ru: 'Адриан Вейл', en: 'Adrian Vale' } },
  { id: 'passenger-11', name: { ru: 'Николас Грей', en: 'Nicholas Gray' } },
  { id: 'passenger-12', name: { ru: 'Говард Пайк', en: 'Howard Pike' } },
  { id: 'passenger-13', name: { ru: 'Рэй Морган', en: 'Ray Morgan' } },
  { id: 'passenger-14', name: { ru: 'Эдгар Уитмор', en: 'Edgar Whitmore' } },
  { id: 'passenger-15', name: { ru: 'Сайлас Кроу', en: 'Silas Crowe' } },
  { id: 'passenger-16', name: { ru: 'Оливер Фелл', en: 'Oliver Fell' } },
  { id: 'passenger-17', name: { ru: 'Бруно Хейл', en: 'Bruno Hale' } },
  { id: 'passenger-18', name: { ru: 'Леон Харт', en: 'Leon Hart' } },
];

export const passengers: Passenger[] = definitions.map((definition) => {
  const { id } = definition;
  const hitboxIndex = Number(id.replace('passenger-', '')) - 1;
  const imagePath = `../assets/characters/${id}.png`;
  const image = images[imagePath];
  if (!image) throw new Error(`Missing character texture: ${imagePath}`);

  return {
    ...definition,
    id,
    image,
    hitbox: getCharacterHitbox(hitboxIndex),
  };
});

export const passengerTextureUrls = passengers.map(({ image }) => image);
