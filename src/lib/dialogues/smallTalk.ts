import type { LocalizedText } from '../investigationTypes';
import type { PassengerId } from '../passengers';
import { insertDialogueDetail } from './localize';
import { getDialogueTemperament } from './temperament';
import { dialogueTopics } from './types';
import type { DialogueTopic } from './types';

interface SmallTalkOption {
  text: LocalizedText;
  response: LocalizedText;
}

type SmallTalkSet = Record<DialogueTopic, SmallTalkOption>;

const smallTalkSets = [
  {
    feature: {
      text: { ru: 'Начнём с внешних примет багажа?', en: 'Shall we begin with the luggage’s visible marks?' },
      response: { ru: 'Спокойно кивает и оглядывает пустую комнату. «Начнём с главного: {detail}»', en: 'Nods calmly and studies the empty room. “Let us start with the main detail: {detail}”' },
    },
    contents: {
      text: { ru: 'Что лежало внутри пропавшего багажа?', en: 'What was inside the missing luggage?' },
      response: { ru: 'Останавливается у голой стены. «Внутри было вот что: {detail}»', en: 'Stops by the bare wall. “This was inside: {detail}”' },
    },
    location: {
      text: { ru: 'Где вы видели багаж перед пропажей?', en: 'Where did you see the luggage before it vanished?' },
      response: { ru: 'Закрывает за собой дверь. «Последнее место помню точно: {detail}»', en: 'Closes the door behind them. “I remember the last place exactly: {detail}”' },
    },
  },
  {
    feature: {
      text: { ru: 'Сразу начнём с особых примет?', en: 'Shall we start with the distinctive marks?' },
      response: { ru: 'Не даёт закончить: «Начинайте искать. Выглядит он так: {detail}»', en: 'Cuts you off: “Start looking. It looks like this: {detail}”' },
    },
    contents: {
      text: { ru: 'Перечислите вещи внутри.', en: 'List what was inside.' },
      response: { ru: 'Перебивает: «Я пришёл не сидеть. Ищите вот это: {detail}»', en: 'Interrupts: “I did not come here to sit. Look for this: {detail}”' },
    },
    location: {
      text: { ru: 'Откуда начнём поиски?', en: 'Where should we begin searching?' },
      response: { ru: 'Перебивает: «С того места, которое я уже запомнил: {detail}»', en: 'Interrupts: “From the place I already remember: {detail}”' },
    },
  },
  {
    feature: {
      text: { ru: 'Поможете узнать багаж по внешнему виду?', en: 'Can you help identify the luggage by sight?' },
      response: { ru: 'Улыбается и проходит в центр комнаты. «Конечно. Выглядит он так: {detail}»', en: 'Smiles and walks to the center of the room. “Of course. It looks like this: {detail}”' },
    },
    contents: {
      text: { ru: 'Поболтаем, пока осматриваем комнату?', en: 'Shall we talk while we inspect the room?' },
      response: { ru: '«Почему бы и нет? Начну с вещей внутри: {detail}»', en: '“Why not? I will start with what was inside: {detail}”' },
    },
    location: {
      text: { ru: 'Пока осматриваем пол, где всё произошло?', en: 'As we inspect the floor, where did it happen?' },
      response: { ru: '«Расскажу по дороге. Последний раз багаж был здесь: {detail}»', en: '“I will tell you on the way. I last saw it here: {detail}”' },
    },
  },
  {
    feature: {
      text: { ru: 'Дверь почти не скрипнула. Как выглядит пропажа?', en: 'The door barely creaked. What does the missing bag look like?' },
      response: { ru: '«Тише иногда безопаснее. Запоминайте: {detail}»', en: '“Silence is safer sometimes. Remember this: {detail}”' },
    },
    contents: {
      text: { ru: 'Что мы должны найти внутри?', en: 'What should we find inside?' },
      response: { ru: '«Больше, чем хотелось бы. Начнём с этого: {detail}»', en: '“More than I would like. Begin with this: {detail}”' },
    },
    location: {
      text: { ru: 'Вы смотрите так, будто уже знаете эту комнату.', en: 'You look as if you already know this room.' },
      response: { ru: '«Возможно. Или комнаты повторяются». Багаж исчез здесь: {detail}', en: '“Perhaps. Or rooms repeat themselves.” The luggage vanished here: {detail}' },
    },
  },
  {
    feature: {
      text: { ru: 'Я не слышал, как открылась дверь. Как вы вошли?', en: 'I did not hear the door open. How did you enter?' },
      response: { ru: '«Дверь сама помнит, когда меня впускать». Затем добавляет: {detail}', en: '“The door remembers when to let me in.” Then adds: {detail}' },
    },
    contents: {
      text: { ru: 'Вы пришли за багажом или снова за мной?', en: 'Did you come for the luggage, or for me again?' },
      response: { ru: '«Это один и тот же поиск. Пока ищи содержимое: {detail}»', en: '“They are the same search. For now, look for these contents: {detail}”' },
    },
    location: {
      text: { ru: 'Дверь была заперта. Откуда вы пришли?', en: 'The door was locked. Where did you come from?' },
      response: { ru: '«Из-за стены, которую ты считаешь настоящей». Багаж появился здесь: {detail}', en: '“From behind the wall you believe is real.” The luggage appeared here: {detail}' },
    },
  },
] satisfies readonly SmallTalkSet[];

function getSmallTalkSet(passengerId: PassengerId) {
  const temperament = getDialogueTemperament(passengerId);
  const styleIndex = temperament === 'friendly'
    ? 2
    : temperament === 'mysterious' ? 3 : temperament === 'nightmare' ? 4
      : temperament === 'calm' ? 0 : 1;
  return smallTalkSets[styleIndex] ?? smallTalkSets[0];
}

export function getSmallTalkChoices(passengerId: PassengerId) {
  const smallTalk = getSmallTalkSet(passengerId);
  return dialogueTopics.map((id) => ({ id, text: smallTalk[id].text }));
}

export function getSmallTalkResponse(
  passengerId: PassengerId,
  topic: DialogueTopic,
  detail: LocalizedText,
) {
  return insertDialogueDetail(getSmallTalkSet(passengerId)[topic].response, detail);
}
