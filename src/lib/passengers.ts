import { CharacterHitbox, LocalizedText } from './investigationTypes';
import { getCharacterHitbox } from './characterHitboxes';

export type PassengerId = `passenger-${string}`;

interface PassengerDefinition {
  id: PassengerId;
  name: LocalizedText;
  profession: LocalizedText;
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
  { id: 'passenger-01', name: { ru: 'Винсент Нокс', en: 'Vincent Knox' }, profession: { ru: 'Полицейский', en: 'Police officer' } },
  { id: 'passenger-02', name: { ru: 'Вивьен Блэк', en: 'Vivienne Black' }, profession: { ru: 'Вор', en: 'Thief' } },
  { id: 'passenger-03', name: { ru: 'Гектор Роу', en: 'Hector Rowe' }, profession: { ru: 'Детектив', en: 'Detective' } },
  { id: 'passenger-04', name: { ru: 'Арчибальд Кейн', en: 'Archibald Kane' }, profession: { ru: 'Бизнесмен', en: 'Businessman' } },
  { id: 'passenger-05', name: { ru: 'Матео Ривера', en: 'Mateo Rivera' }, profession: { ru: 'Киллер', en: 'Hitman' } },
  { id: 'passenger-06', name: { ru: 'Новый пассажир', en: 'New Passenger' }, profession: { ru: 'Безработный, ищет лучшую жизнь в новой стране', en: 'Unemployed newcomer seeking a better life' } },
  { id: 'passenger-07', name: { ru: 'Патрик Бейтман', en: 'Patrick Bateman' }, profession: { ru: 'Безумец', en: 'Madman' } },
  { id: 'passenger-08', name: { ru: 'Хацунэ Мику', en: 'Hatsune Miku' }, profession: { ru: 'Певица', en: 'Singer' } },
  { id: 'passenger-09', name: { ru: 'Виктор Стоун', en: 'Victor Stone' }, profession: { ru: 'Качок', en: 'Bodybuilder' } },
  { id: 'passenger-10', name: { ru: 'Адриан Вейл', en: 'Adrian Vale' }, profession: { ru: 'Наркобарон', en: 'Drug lord' } },
  { id: 'passenger-11', name: { ru: 'Николас Грей', en: 'Nicholas Gray' }, profession: { ru: 'Сварщик', en: 'Welder' } },
  { id: 'passenger-12', name: { ru: 'Говард Пайк', en: 'Howard Pike' }, profession: { ru: 'Рабочий завода', en: 'Factory worker' } },
  { id: 'passenger-13', name: { ru: 'Рэй Морган', en: 'Ray Morgan' }, profession: { ru: 'Получает пенсию по инвалидности', en: 'Disability pension recipient' } },
  { id: 'passenger-14', name: { ru: 'Эдгар Уитмор', en: 'Edgar Whitmore' }, profession: { ru: 'Дворецкий', en: 'Butler' } },
  { id: 'passenger-15', name: { ru: 'Сайлас Кроу', en: 'Silas Crowe' }, profession: { ru: 'Киллер', en: 'Hitman' } },
  { id: 'passenger-16', name: { ru: 'Оливер Фелл', en: 'Oliver Fell' }, profession: { ru: 'Кошатник, живёт на доход от депозита', en: 'Cat lover living on investment income' } },
  { id: 'passenger-17', name: { ru: 'Бруно Хейл', en: 'Bruno Hale' }, profession: { ru: 'Философ', en: 'Philosopher' } },
  { id: 'passenger-18', name: { ru: 'Леон Харт', en: 'Leon Hart' }, profession: { ru: 'Собачник, ничем не занят', en: 'Dog lover, currently unemployed' } },
  { id: 'passenger-19', name: { ru: 'Мистер Блэк', en: 'Mr. Black' }, profession: { ru: 'Неизвестен, опасен и пугающ', en: 'Unknown, dangerous and frightening' } },
  { id: 'passenger-20', name: { ru: 'Морган Найт', en: 'Morgan Night' }, profession: { ru: 'Просто красивая и прикольная девушка', en: 'A cool and beautiful girl' } },
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
