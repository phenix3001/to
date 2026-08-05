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
      text: { ru: 'Где вы видели багаж в последний раз?', en: 'Where did you last see the luggage?' },
      response: { ru: '«Иногда места повторяются». Последний раз багаж был здесь: {detail}', en: '“Sometimes places repeat themselves.” The luggage was last seen here: {detail}' },
    },
  },
  {
    feature: {
      text: { ru: 'По какой примете я узнаю ваш чемодан?', en: 'Which mark will identify your suitcase?' },
      response: { ru: '«Смотри на углы, не на середину. Его выдаёт вот что: {detail}»', en: '“Watch the edges, not the center. This will give it away: {detail}”' },
    },
    contents: {
      text: { ru: 'Что должно быть внутри?', en: 'What should be inside?' },
      response: { ru: '«Не всё внутри должно быть найдено. Но ищи это: {detail}»', en: '“Not everything inside should be found. But look for this: {detail}”' },
    },
    location: {
      text: { ru: 'Где вы оставили чемодан перед пропажей?', en: 'Where did you leave the suitcase before it vanished?' },
      response: { ru: '«Там, где свет не достаёт до пола. Последний след был здесь: {detail}»', en: '“Where the light does not reach the floor. The final trace was here: {detail}”' },
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
