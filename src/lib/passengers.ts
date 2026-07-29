import { CaseId, CharacterHitbox, LocalizedText } from './investigationTypes';
import { getCharacterHitbox } from './characterHitboxes';

export type PassengerId = `passenger-${string}`;

interface PassengerDefinition {
  name: LocalizedText;
  caseId?: CaseId;
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
  { name: { ru: 'Алиса Орлова', en: 'Alice Orlova' } },
  { name: { ru: 'Марк Ветров', en: 'Mark Vetrov' } },
  { name: { ru: 'Нина Соколова', en: 'Nina Sokolova' }, caseId: 'elderly' },
  { name: { ru: 'Леон Белов', en: 'Leon Belov' } },
  { name: { ru: 'Тимур Азимов', en: 'Timur Azimov' } },
  { name: { ru: 'Вера Лебедева', en: 'Vera Lebedeva' } },
  { name: { ru: 'Илья Морозов', en: 'Ilya Morozov' } },
  { name: { ru: 'Майя Волкова', en: 'Maya Volkova' }, caseId: 'punk' },
  { name: { ru: 'Глеб Романов', en: 'Gleb Romanov' } },
  { name: { ru: 'Лола Миронова', en: 'Lola Mironova' } },
  { name: { ru: 'Ева Крылова', en: 'Eva Krylova' }, caseId: 'business' },
  { name: { ru: 'Ян Новак', en: 'Jan Novak' } },
  { name: { ru: 'Агата Рид', en: 'Agatha Reed' } },
  { name: { ru: 'Феликс Бергер', en: 'Felix Berger' } },
  { name: { ru: 'София Ким', en: 'Sofia Kim' } },
  { name: { ru: 'Макс Власов', en: 'Max Vlasov' } },
  { name: { ru: 'Роза Марен', en: 'Rosa Maren' } },
  { name: { ru: 'Оскар Линд', en: 'Oscar Lind' } },
  { name: { ru: 'Мира Давыдова', en: 'Mira Davydova' } },
  { name: { ru: 'Тео Ларсен', en: 'Theo Larsen' } },
  { name: { ru: 'Ида Нур', en: 'Ida Nur' } },
  { name: { ru: 'Луи Мартен', en: 'Louis Martin' } },
  { name: { ru: 'Кира Сафина', en: 'Kira Safina' } },
  { name: { ru: 'Ник Грей', en: 'Nick Gray' } },
  { name: { ru: 'Эмма Райнер', en: 'Emma Rayner' } },
  { name: { ru: 'Артур Волин', en: 'Arthur Volin' } },
  { name: { ru: 'Лея Сандер', en: 'Leia Sander' } },
  { name: { ru: 'Павел Зорин', en: 'Pavel Zorin' } },
  { name: { ru: 'Ада Рой', en: 'Ada Roy' } },
  { name: { ru: 'Бен Картер', en: 'Ben Carter' } },
  { name: { ru: 'Джейн Кросс', en: 'Jane Cross' } },
  { name: { ru: 'Рэй Норт', en: 'Ray North' } },
  { name: { ru: 'Зоя Белл', en: 'Zoe Bell' } },
  { name: { ru: 'Сэм Уилсон', en: 'Sam Wilson' } },
  { name: { ru: 'Анна Коваль', en: 'Anna Koval' } },
  { name: { ru: 'Дэн Миллер', en: 'Dan Miller' } },
  { name: { ru: 'Клара Стерн', en: 'Clara Stern' } },
  { name: { ru: 'Лев Грант', en: 'Leo Grant' } },
  { name: { ru: 'Сара Нойман', en: 'Sarah Neumann' } },
  { name: { ru: 'Том Браун', en: 'Tom Brown' } },
];

function modelId(index: number): PassengerId {
  return `passenger-${String(index + 1).padStart(2, '0')}`;
}

export const passengers: Passenger[] = definitions.map((definition, index) => {
  const id = modelId(index);
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
