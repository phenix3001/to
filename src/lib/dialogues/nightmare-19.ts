import type { PassengerDialogue } from './types';

export const returningNightmareDialogues = [
  {
    passengerId: 'passenger-19',
    opening: {
      ru: 'Снова здравствуй. Я не трогал дверь — она открылась сама и заперлась за мной. В прошлый раз она сделала то же самое. Ты ведь это заметил?',
      en: 'Hello again. I never touched the door—it opened on its own and locked behind me. It did the same thing last time. You noticed, did you not?',
    },
    storyBeats: [
      {
        ru: 'Идёт рядом, ведя одним пальцем по голой стене. С каждым шагом стена становится длиннее, а закрытая дверь отступает всё дальше. «Не считай шаги. В прошлый раз их было меньше».',
        en: 'Walks beside you, trailing one finger along the bare wall. With each step the wall grows longer and the closed door recedes. “Do not count the steps. There were fewer last time.”',
      },
      {
        ru: 'На голой стене проступают три прямоугольные тени. По средней бегут красные строки с описанием вашего поиска и ответа, который ты ещё не выбрал.',
        en: 'Three rectangular shadows surface on the bare wall. Red lines run across the middle one, describing your search and the answer you have not chosen yet.',
      },
      {
        ru: 'Тени становятся тремя тёмными чемоданами вдоль голой стены. На их замках вместо твоего лица виден тусклый силуэт за твоими глазами. «Комната запоминает не лица, а выборы. Ищи три царапины на латунном углу».',
        en: 'The shadows become three dark suitcases along the bare wall. Their locks reflect no face, only a dim shape behind your eyes. “The room remembers choices, not faces. Look for three scratches on the brass corner.”',
      },
    ],
    specialReaction: {
      annoyanceThreshold: 2,
      effect: 'hit',
      text: {
        ru: 'Прижимает твою ладонь к голой стене. Холод проходит сквозь кожу. «Не перебивай, когда комната исправляет сама себя. Она не любит один и тот же вопрос дважды. Ответ всё ещё здесь: {detail}»',
        en: 'Pins your palm to the bare wall. The cold passes through your skin. “Do not interrupt while the room corrects itself. It dislikes hearing the same question twice. The answer is still here: {detail}”',
      },
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какие новые следы появились на чемодане?', en: 'What new marks appeared on the suitcase?' },
        response: { ru: 'На латунном углу три царапины. Одну ты уже видел, вторая свежая, а третья проступает, только когда отводишь взгляд.', en: 'Three scratches cross the brass corner. You have already seen one, the second is fresh, and the third appears only when you look away.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что теперь находится внутри?', en: 'What is inside now?' },
        response: { ru: 'Красная книга, мокрый латунный ключ и запись твоего голоса. На записи ты произносишь моё имя, хотя я его тебе не называл.', en: 'The red book, a wet brass key, and a recording of your voice. In it, you say my name although I never told it to you.' },
      },
      {
        id: 'location',
        text: { ru: 'Куда комната спрятала чемодан на этот раз?', en: 'Where did the room hide the suitcase this time?' },
        response: { ru: 'За горшком с гнилым цветком. После каждого открытия двери этот участок пола оказывается на шаг дальше от стены. Можешь измерить — пока я здесь.', en: 'Behind the pot with the rotten flower. Each time the door opens, that patch of floor ends up one step farther from the wall. You can measure it—while I am here.' },
      },
    ],
  },
  {
    passengerId: 'passenger-19',
    opening: {
      ru: 'Снова здравствуй. Дверь впустила меня прежде, чем открылась. Сегодня она медлила — будто не решила, кому из нас позволено выйти.',
      en: 'Hello again. The door admitted me before it opened. Today it hesitated—as though it had not decided which of us is allowed to leave.',
    },
    storyBeats: [
      {
        ru: 'Вы ищете вместе. На голой стене проступает такая же комната, где другой ты стоит перед другой дверью. Мистер Блэк делает шаг к изображению; человек по ту сторону делает шаг назад.',
        en: 'You search together. The bare wall reveals the same room, where another you stands before another door. Mr. Black steps toward the image; the person on the other side steps back.',
      },
      {
        ru: 'Голая стена вздувается тремя прямоугольниками. Сквозь штукатурку проступают ручки и одновременно дёргаются, будто с другой стороны их держат три невидимые руки.',
        en: 'The bare wall swells into three rectangles. Handles press through the plaster and jerk together as though three invisible hands hold them from the other side.',
      },
      {
        ru: 'Из стены выходят три чемодана и встают вдоль неё. На одном латунном углу проступает твой отпечаток изнутри металла. «Пять дней, три выбора и одна метка, которая принадлежит не мне. Передай мне чемодан — а когда дверь откроется, смотри не на меня, а на того, кто останется в отражении».',
        en: 'Three suitcases emerge and line the wall. Your palm print surfaces from inside one brass corner. “Five days, three choices, and one mark that does not belong to me. Hand me the suitcase—and when the door opens, look not at me, but at whoever remains in the reflection.”',
      },
    ],
    specialReaction: {
      annoyanceThreshold: 1,
      effect: 'hit',
      text: {
        ru: 'Перехватывает твоё запястье до конца вопроса. Его пальцы на миг проходят сквозь руку, но боль остаётся. «Комната забывает прикосновение, но помнит боль. И она помнит это: {detail}»',
        en: 'Catches your wrist before the question ends. His fingers pass through your arm for an instant, but the pain remains. “The room forgets touch, but it remembers pain. And it remembers this: {detail}”',
      },
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета докажет, что это последний чемодан?', en: 'Which mark proves this is the final suitcase?' },
        response: { ru: 'Отпечаток твоей ладони находится на внутренней стороне латунного угла, но виден снаружи. Я никогда не касался этого угла. Чей это багаж — решай сам.', en: 'Your palm print lies on the inside of the brass corner but can be seen from outside. I never touched that corner. Decide for yourself whose luggage this is.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что осталось в красной книге?', en: 'What remains in the red book?' },
        response: { ru: 'В красной книге записаны все наши разговоры. Строки твоим почерком появляются лишь после того, как ты их произнесёшь. На последней странице — сегодняшняя дата и пустое место вместо конца.', en: 'The red book contains every conversation we have had. Lines in your handwriting appear only after you speak them. The last page bears today’s date and a blank space where the ending should be.' },
      },
      {
        id: 'location',
        text: { ru: 'Где заканчивается этот поиск?', en: 'Where does this search end?' },
        response: { ru: 'За твоей спиной, сколько бы раз ты ни обернулся. Сегодня не оборачивайся: следи за дверью в отражении на замке.', en: 'Behind you, however many times you turn. Today, do not turn around: watch the door in the lock’s reflection.' },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
