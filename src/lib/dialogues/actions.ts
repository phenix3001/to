import type { LocalizedText } from '../investigationTypes';
import type { PassengerId } from '../passengers';
import { getDialogueTemperament } from './temperament';
import type { DialogueTemperament } from './temperament';

type ActionBeats = readonly [LocalizedText, LocalizedText, LocalizedText];

const actionBeats: Record<DialogueTemperament, ActionBeats> = {
  calm: [
    { ru: 'Сам открывает дверь, входит, тихо закрывает её и спокойно осматривает комнату.', en: 'Opens the door, steps inside, quietly closes it, and calmly studies the room.' },
    { ru: 'Идёт рядом через пустую комнату, изучая следы на старом полу.', en: 'Walks beside you across the empty room, studying marks on the worn floor.' },
    { ru: 'Наклоняется к трём подходящим сумкам, но ждёт твоего решения.', en: 'Leans toward three likely bags but waits for your decision.' },
  ],
  friendly: [
    { ru: 'Сам открывает дверь, входит с улыбкой и придерживает её, чтобы она не хлопнула.', en: 'Opens the door, enters with a smile, and catches it before it slams.' },
    { ru: 'Показывает нужный размер руками и тут же смеётся собственной неточности.', en: 'Shows the size with both hands, then laughs at the rough estimate.' },
    { ru: 'Замечает три похожих чемодана и ободряюще кивает тебе.', en: 'Spots three similar suitcases and gives you an encouraging nod.' },
  ],
  impatient: [
    { ru: 'Без стука распахивает дверь, не садится и коротко смотрит на часы.', en: 'Pushes the door open without knocking, remains standing, and checks the time.' },
    { ru: 'Резким жестом просит не тянуть время; пальцы отбивают быстрый ритм.', en: 'Makes a sharp gesture not to waste time; fingers tap a quick rhythm.' },
    { ru: 'Тянется к одной из трёх ручек, но раздражённо ждёт твоего выбора.', en: 'Reaches toward one of three handles, then waits irritably for your choice.' },
  ],
  mysterious: [
    { ru: 'Сам входит и задерживает взгляд на голой стене, будто там на миг появилась ещё одна дверь.', en: 'Enters alone and watches the bare wall as if another door appeared there for a moment.' },
    { ru: 'Понижает голос; последние слова почти растворяются в тишине пустой комнаты.', en: 'Lowers their voice; the last words nearly dissolve into the silence of the empty room.' },
    { ru: 'Дважды пересчитывает три сумки и во второй раз оставляет место для четвёртой.', en: 'Counts the three bags twice and leaves an empty place for a fourth on the second count.' },
  ],
  nightmare: [
    { ru: 'Без стука дверь открывается сама. Тень пересекает порог на миг раньше фигуры.', en: 'Without a knock, the door opens itself. The shadow crosses the threshold a moment before the figure.' },
    { ru: 'Сухие листья гнилого цветка шевелятся. Тень тянется к стене, хотя фигура не двигается.', en: 'The rotten flower’s dry leaves stir. A shadow reaches toward the wall although the figure does not move.' },
    { ru: 'Из трёх чемоданов раздаются три медленных стука — по одному из каждого.', en: 'Three slow knocks sound from the three suitcases—one from each.' },
  ],
};

const returningNightmareActions: readonly ActionBeats[] = [
  [
    { ru: 'Никто не стучал, но дверная ручка уже медленно поворачивается.', en: 'Nobody knocked, yet the door handle is already turning slowly.' },
    { ru: 'Кладёт мокрый латунный ключ на пол у гнилого цветка. Капля воды ползёт по ключу вверх.', en: 'Places a wet brass key on the floor by the rotten flower. A drop of water crawls upward across it.' },
    { ru: 'Указывает на три чемодана. Его тень на стене указывает на тебя.', en: 'Points at three suitcases. His shadow on the wall points at you.' },
  ],
  [
    { ru: 'Дверь едва приоткрывается, а фигура уже неподвижно стоит у дальней стены.', en: 'The door barely opens, yet the figure is already standing motionless by the far wall.' },
    { ru: 'Заканчивает последнее слово вместо тебя. Гнилой цветок на миг выпрямляется.', en: 'Finishes your last word for you. The rotten flower straightens for a moment.' },
    { ru: 'Три чемодана отбрасывают одну общую тень, похожую на запертую дверь.', en: 'The three suitcases cast one shared shadow shaped like a locked door.' },
  ],
];

function getActionIndex(pathLength: number) {
  if (pathLength === 0) return 0;
  if (pathLength === 2) return 1;
  if (pathLength === 4) return 2;
  return null;
}

export function getDialogueAction(
  passengerId: PassengerId,
  pathLength: number,
  encounterNumber = 1,
) {
  const actionIndex = getActionIndex(pathLength);
  if (actionIndex === null) return null;
  const temperament = getDialogueTemperament(passengerId);
  if (temperament === 'nightmare' && encounterNumber > 1) {
    const encounterActions = returningNightmareActions[Math.min(encounterNumber, 3) - 2];
    if (encounterActions) return encounterActions[actionIndex];
  }
  return actionBeats[temperament][actionIndex];
}
