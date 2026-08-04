import { PassengerDialogue } from './types';
import { dayOneStoryBeats } from './stories/day-1';

export const dayOneDialogues = [
  {
    passengerId: 'passenger-01',
    storyBeats: dayOneStoryBeats['passenger-01'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'tap',
      text: {
        ru: 'Дважды стучит костяшками по крышке ближайшего чемодана. «Мы ищем вместе, но слушать всё равно придётся: {detail}»',
        en: 'Raps twice on the nearest suitcase lid. “We are searching together, but you still need to listen: {detail}”',
      },
    },
    opening: {
      ru: 'Здравствуйте. Я первым решился открыть дверь; остальные пока ждут в коридоре. У меня пропал тёмно-синий чемодан — давайте осмотрим комнату вместе.',
      en: 'Hello. I was the first to open the door; the others are still waiting outside. My dark blue suitcase is missing—let us search the room together.',
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'С чего начать осмотр чемоданов?', en: 'What should I check first?' },
        response: {
          ru: 'Ищите тёмно-синий корпус, оранжевую ленту на ручке и глубокую вмятину справа. Цвет можно перепутать, вмятину — нет.',
          en: 'Look for a dark blue shell, an orange ribbon on the handle, and a deep dent on the right. Color can be mistaken; that dent cannot.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Чем подтвердим находку изнутри?', en: 'What inside will confirm the find?' },
        response: {
          ru: 'Там серый свитер и альбом. На первой странице мой рисунок фонаря с кривой опорой — его я узнаю сразу.',
          en: 'There is a gray sweater and a sketchbook. The first page has my drawing of a lamp with a crooked post—I will recognize it at once.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Откуда начнём искать?', en: 'Where should we begin searching?' },
        response: {
          ru: 'Утром он стоял у закрытой двери. Оттуда по пыльному потёртому полу тянется прерывистый след к дальней стене.',
          en: 'It stood beside the closed door this morning. A broken trail runs from there across the dusty, worn floor toward the far wall.',
        },
      },
    ],
  },
  {
    passengerId: 'passenger-02',
    storyBeats: dayOneStoryBeats['passenger-02'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'joke',
      text: {
        ru: 'Тихо звенит ногтем по треснувшему колокольчику. «Ещё один круг вопросов — и рюкзак сам откликнется: {detail}»',
        en: 'Flicks a fingernail against a cracked bell. “One more round of questions and the backpack will answer for itself: {detail}”',
      },
    },
    opening: {
      ru: 'Привет. Дверь была приоткрыта, так что я заглянул. За мной всё ещё спорят, кто войдёт следующим. Я ищу маленький жёлтый рюкзак. С чего начнём?',
      en: 'Hi. The door was ajar, so I stepped inside. They are still arguing outside over who comes in next. I am looking for a small yellow backpack. Where do we start?',
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как отличить его от других жёлтых рюкзаков?', en: 'How do we tell it from the other yellow backpacks?' },
        response: {
          ru: 'Клубника пришита вручную, один листик у неё короче. На молнии висит колокольчик с трещиной сбоку.',
          en: 'The strawberry patch is hand-sewn, and one leaf is shorter. A little bell with a crack on its side hangs from the zipper.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Что проверим внутри?', en: 'What should we check inside?' },
        response: {
          ru: 'Красный шарф и зелёную бутылку с помятой крышкой. Шарф лежал в боковом кармане, не в основном отделении.',
          en: 'A red scarf and a green bottle with a dented cap. The scarf was in the side pocket, not the main compartment.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Где он исчез?', en: 'Where did it disappear?' },
        response: {
          ru: 'После обеда он стоял у двери. Потом колокольчик звякнул в углу, возле горшка с увядшим цветком.',
          en: 'It stood by the door after lunch. Later I heard its bell from the corner beside the pot with the wilted flower.',
        },
      },
    ],
  },
  {
    passengerId: 'passenger-03',
    storyBeats: dayOneStoryBeats['passenger-03'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'tense',
      text: {
        ru: 'Чертит пальцем круг в пыли на полу. «Мы снова дошли до этой реплики. Факты в ней всё те же: {detail}»',
        en: 'Traces a circle in the dust on the floor. “We have reached this line again. Its facts are still the same: {detail}”',
      },
    },
    opening: {
      ru: 'Добрый вечер. Я коснулся ручки, и дверь открылась точно в тот миг, который я уже видел на экране. Теперь мы должны искать мою зелёную сумку. Почему я знаю следующую сцену?',
      en: 'Good evening. I touched the handle, and the door opened at the exact moment I had already seen on a screen. Now we are meant to search for my green bag. Why do I know the next scene?',
    },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какую примету искать среди багажа?', en: 'Which mark should we look for among the luggage?' },
        response: {
          ru: 'Зелёная ткань, широкая белая полоса и ручка, зашитая синей ниткой. Последние три стежка образуют цифру, которой здесь нет.',
          en: 'Green fabric, a wide white stripe, and a handle repaired with blue thread. The final three stitches form a number that does not exist here.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно быть внутри сумки?', en: 'What should be inside the bag?' },
        response: {
          ru: 'Кеды, книга и клетчатая рубашка. В книге стоит моя подпись, а между страницами не должно быть ничего нового.',
          en: 'Sneakers, a book, and a checked shirt. My signature is inside the book, and there should be nothing new between its pages.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Куда ведут следы по полу?', en: 'Where do the marks across the floor lead?' },
        response: {
          ru: 'Сумка стояла у левой стены, рядом с увядшим цветком. Следы пересекают комнату и обрываются у голой стены, где камера обычно меняет кадр.',
          en: 'The bag stood by the left wall beside the wilted flower. The marks cross the room and stop at a bare wall where the camera would normally cut away.',
        },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
