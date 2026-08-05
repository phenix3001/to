import { LocalizedText } from './investigationTypes';
import { PassengerId } from './passengers';
import {
  DialogueTemperament, getDialogueTemperament,
} from './dialogues/temperament';

export interface VisitorArrivalLine {
  action: LocalizedText;
  speech: LocalizedText;
}

const arrivalLines: Record<DialogueTemperament, VisitorArrivalLine> = {
  calm: {
    action: { ru: 'Сам открывает дверь, входит и останавливается перед тобой.', en: 'Opens the door, enters, and stops in front of you.' },
    speech: { ru: 'Здравствуйте. Где мой багаж? Мне сказали, что его принесли сюда.', en: 'Hello. Where is my luggage? I was told it had been brought here.' },
  },
  friendly: {
    action: { ru: 'Сам заглядывает внутрь и заходит с осторожной улыбкой.', en: 'Peeks inside, then enters with a cautious smile.' },
    speech: { ru: 'Привет! Вы не видели мой багаж? Я уже начал думать, что он путешествует без меня.', en: 'Hi! Have you seen my luggage? I am starting to think it is travelling without me.' },
  },
  impatient: {
    action: { ru: 'Распахивает дверь без стука и нетерпеливо смотрит на тебя.', en: 'Pushes the door open without knocking and fixes you with an impatient look.' },
    speech: { ru: 'Где мой багаж? Я пришёл забрать его, а не ждать в коридоре.', en: 'Where is my luggage? I came to collect it, not wait in the corridor.' },
  },
  mysterious: {
    action: { ru: 'Дверь медленно открывается, и посетитель бесшумно входит сам.', en: 'The door slowly opens, and the visitor steps inside without a sound.' },
    speech: { ru: 'Добрый вечер. Где мой багаж — в вашей комнате или в той, которой здесь больше нет?', en: 'Good evening. Where is my luggage—in your room, or in the room that no longer exists?' },
  },
  nightmare: {
    action: { ru: 'Ручка поворачивается сама. Он входит, не отрывая от тебя взгляда.', en: 'The handle turns by itself. He enters without taking his eyes off you.' },
    speech: { ru: 'Где мой багаж? Не торопись с ответом. В этой комнате первая мысль редко бывает верной.', en: 'Where is my luggage? Do not rush your answer. In this room, the first thought is rarely the right one.' },
  },
};

const returningNightmareLines: readonly VisitorArrivalLine[] = [
  {
    action: { ru: 'Дверь открывается раньше, чем он касается ручки.', en: 'The door opens before he touches the handle.' },
    speech: { ru: 'Снова здравствуй. Где мой багаж? Или ты надеялся, что после первого раза я исчезну?', en: 'Hello again. Where is my luggage? Or did you hope I would vanish after the first time?' },
  },
  {
    action: { ru: 'Он уже стоит в проёме, хотя дверь только начинает открываться.', en: 'He is already in the doorway although the door has only begun to open.' },
    speech: { ru: 'Где мой багаж? Сегодня я спрашиваю в последний раз. Когда дверь закроется, прислушайся: замок щёлкнет не с той стороны.', en: 'Where is my luggage? Today I ask for the last time. When the door closes, listen carefully: the lock will click on the wrong side.' },
  },
];

export function getVisitorArrivalLine(
  passengerId: PassengerId,
  encounterNumber: number,
) {
  if (passengerId === 'passenger-19' && encounterNumber > 1) {
    return returningNightmareLines[Math.min(encounterNumber, 3) - 2]
      ?? arrivalLines.nightmare;
  }
  return arrivalLines[getDialogueTemperament(passengerId)];
}
