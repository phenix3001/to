import type { PassengerDialogue } from './types';

export const returningNightmareDialogues = [
  {
    passengerId: 'passenger-19',
    opening: {
      ru: 'Снова здравствуй. Я не трогал дверь — она открылась сама и заперлась за мной. Ты думаешь, посетители входят сюда по своей воле, но это комната каждый раз решает, кого впустить к тебе.',
      en: 'Hello again. I never touched the door—it opened on its own and locked behind me. You think visitors enter by choice, but the room decides who it will admit to you each time.',
    },
    storyBeats: [
      {
        ru: 'Идёт рядом, ведя одним пальцем по голой стене. С каждым шагом стена становится длиннее, а закрытая дверь отступает всё дальше. «Я написал расстояние после того, как ты пошёл».',
        en: 'Walks beside you, trailing one finger along the bare wall. With each step the wall grows longer and the closed door recedes. “I wrote the distance after you began walking.”',
      },
      {
        ru: 'На голой стене проступают три прямоугольные тени. По средней бегут красные строки с описанием вашего поиска и ответа, который ты ещё не выбрал.',
        en: 'Three rectangular shadows surface on the bare wall. Red lines run across the middle one, describing your search and the answer you have not chosen yet.',
      },
      {
        ru: 'Тени становятся тремя тёмными чемоданами вдоль голой стены. На их замках вместо твоего отражения виден тусклый силуэт, запертый за глазами. «Я создал стены, двери и дни. Тебя я поймал. Ищи три царапины на латунном углу».',
        en: 'The shadows become three dark suitcases along the bare wall. Their locks reflect no body, only a dim shape trapped behind your eyes. “I created the walls, the doors, and the days. I caught you. Look for three scratches on the brass corner.”',
      },
    ],
    specialReaction: {
      annoyanceThreshold: 2,
      effect: 'hit',
      text: {
        ru: 'Прижимает твою ладонь к голой стене. Холод проходит сквозь кожу. «Не перебивай автора посреди исправления. Я уже оставил тебе ответ: {detail}»',
        en: 'Pins your palm to the bare wall. The cold passes through your skin. “Do not interrupt the author in the middle of a revision. I already left you the answer: {detail}”',
      },
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какие новые следы появились на чемодане?', en: 'What new marks appeared on the suitcase?' },
        response: { ru: 'На латунном углу три царапины. Первая появилась, когда дверь впустила меня раньше, вторая — сегодня, а третья уже ждёт тебя в дне, до которого ты ещё не дошёл.', en: 'Three scratches cross the brass corner. The first appeared when the door admitted me before, the second belongs to today, and the third already waits in a day you have not reached.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что теперь находится внутри?', en: 'What is inside now?' },
        response: { ru: 'Красная книга, мокрый латунный ключ и запись твоего голоса. На ней ты просишь открыть дверь ещё до того, как научился говорить здесь.', en: 'The red book, a wet brass key, and a recording of your voice. In it, you beg for the door to open before you learned to speak here.' },
      },
      {
        id: 'location',
        text: { ru: 'Куда комната спрятала чемодан на этот раз?', en: 'Where did the room hide the suitcase this time?' },
        response: { ru: 'На участке пола за горшком с гнилым цветком, который становится глубже после того, как дверь сама открывается. Она впускает посетителя, а вселенная растягивает комнату.', en: 'On the patch of floor behind the rotten flowerpot, which grows deeper after the door opens by itself. It admits a visitor, and the universe stretches the room.' },
      },
    ],
  },
  {
    passengerId: 'passenger-19',
    opening: {
      ru: 'Привет, запертая душа. Сегодня дверь впустила не посетителя, а того, кто придумал саму дверь. Войди глубже в свою комнату — с этой стороны она выглядит почти как выход.',
      en: 'Hello, trapped soul. Today the door admitted not a visitor, but the one who designed the door itself. Step deeper into your room—from this side, it almost resembles an exit.',
    },
    storyBeats: [
      {
        ru: 'Вы ищете вместе. На голой стене проступает такая же комната, где ещё один ты смотрит, как дверь сама впускает ещё одного его. Создатель спокойно шагает в повторяющуюся стену; тебе приходится остаться с этой стороны.',
        en: 'You search together. The bare wall reveals the same room, where another you watches the door admit another him by itself. The creator calmly steps into the repeating wall; you have to remain on this side.',
      },
      {
        ru: 'Голая стена вздувается тремя прямоугольниками. Сквозь штукатурку проступают ручки и одновременно дёргаются, будто с другой стороны их держат три невидимые руки.',
        en: 'The bare wall swells into three rectangles. Handles press through the plaster and jerk together as though three invisible hands hold them from the other side.',
      },
      {
        ru: 'Из стены выходят три чемодана и встают вдоль неё. На одном латунном углу проступает твой отпечаток изнутри металла. «Я построил пять дней, чтобы душа считала время вместо прутьев. Выбери и протяни мне — клетка сочтёт это возвратом, хотя пропажей был ты».',
        en: 'Three suitcases emerge and line the wall. Your palm print surfaces from inside one brass corner. “I built five days so the soul would count time instead of bars. Choose and hand it to me—the cage will treat it as a return, though you were the missing thing.”',
      },
    ],
    specialReaction: {
      annoyanceThreshold: 1,
      effect: 'hit',
      text: {
        ru: 'Перехватывает твоё запястье до конца вопроса. Его пальцы на миг проходят сквозь руку, но боль остаётся. «Душа быстро учится боли. Медленнее — тому, что тела нет. {detail}»',
        en: 'Catches your wrist before the question ends. His fingers pass through your arm for an instant, but the pain remains. “A soul learns pain quickly. It takes longer to learn there is no body. {detail}”',
      },
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета докажет, что это последний чемодан?', en: 'Which mark proves this is the final suitcase?' },
        response: { ru: 'Отпечаток твоей ладони находится на внутренней стороне латунного угла, но виден снаружи. У клетки и пленника давно перепутались стороны.', en: 'Your palm print lies on the inside of the brass corner but can be seen from outside. The cage and its prisoner have long since confused their sides.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что осталось в красной книге?', en: 'What remains in the red book?' },
        response: { ru: 'Все варианты наших разговоров и каждый перезапуск. Последняя строка меняется, но под ней всегда проступают два слова: «Душа остаётся».', en: 'Every version of our conversations and every restart. The last line changes, but two words always bleed through beneath it: “The soul remains.”' },
      },
      {
        id: 'location',
        text: { ru: 'Где заканчивается этот поиск?', en: 'Where does this search end?' },
        response: { ru: 'За твоей спиной, сколько бы раз ты ни обернулся. Центр этой вселенной привязан к взгляду пленника, поэтому выход всегда успевает перейти на другую сторону.', en: 'Behind you, however many times you turn. The center of this universe is tied to its prisoner’s gaze, so the exit always has time to move to the other side.' },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
