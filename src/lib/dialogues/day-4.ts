import { PassengerDialogue } from './types';
import { dayFourStoryBeats } from './stories/day-4';

export const dayFourDialogues = [
  {
    passengerId: 'passenger-13',
    storyBeats: dayFourStoryBeats['passenger-13'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'nervous',
      text: { ru: 'Опирается ладонью о стену и устало вздыхает. «Давайте не начинать сначала. Мы уже знаем, что искать: {detail}»', en: 'Rests a palm against the wall and sighs wearily. “Let us not start over. We already know what to look for: {detail}”' },
    },
    opening: { ru: 'Здравствуйте. Я войду? У меня пропал чёрный рюкзак. Позвольте минуту отдышаться у двери, а потом я помогу осмотреть пол и стены.', en: 'Hello. May I come in? My black backpack is missing. Let me catch my breath by the door, then I will help inspect the floor and walls.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как отличить его от других рюкзаков?', en: 'How can I distinguish it from the other backpacks?' },
        response: { ru: 'На молнии оранжевый брелок-рыбка, а левая лямка сильно потёрта и цепляется за ткань.', en: 'There is an orange fish keychain on the zipper, and the left strap is badly worn and catches on fabric.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что мы должны найти внутри?', en: 'What should we find inside?' },
        response: { ru: 'Очки в синем футляре и тёплая шапка.', en: 'Glasses in a blue case and a warm hat.' },
      },
      {
        id: 'location',
        text: { ru: 'Где рюкзак исчез?', en: 'Where did the backpack disappear?' },
        response: { ru: 'Я оставил его у стены рядом с увядшим цветком и отошёл за водой. Вернулся — остался только след от лямки на пыли.', en: 'I left it by the wall near the wilted flower and stepped away for water. When I returned, only a strap mark remained in the dust.' },
      },
    ],
  },
  {
    passengerId: 'passenger-14',
    storyBeats: dayFourStoryBeats['passenger-14'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'tap',
      text: { ru: 'Аккуратно поправляет рукав. «Боюсь, повторение не сделает описание точнее: {detail}»', en: 'Neatly adjusts a sleeve. “I am afraid repeating it will not make the description more precise: {detail}”' },
    },
    opening: { ru: 'Добрый вечер. Прошу простить, что вошёл без приглашения. Пропал мой тёмный чемодан. И простите за замечание: пыль вдоль дальней стены лежит ровно, кроме одного смазанного места.', en: 'Good evening. Forgive me for entering without an invitation. My dark suitcase is missing. And pardon the observation: the dust along the far wall is even except for one smeared patch.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какие детали нужно сверить?', en: 'Which details should we compare?' },
        response: { ru: 'Один угол потёрт, застёжка латунная, а к ручке привязан складной зонт.', en: 'One corner is worn, the clasp is brass, and an umbrella is tied to the handle.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно быть внутри?', en: 'What should be inside?' },
        response: { ru: 'Белая рубашка и коробка с чайными чашками.', en: 'A white shirt and a box of teacups.' },
      },
      {
        id: 'location',
        text: { ru: 'Где вы заметили пропажу?', en: 'Where did you notice it was missing?' },
        response: { ru: 'Я оставил чемодан у стены напротив двери, пока завязывал зонт. Когда повернулся, там стоял уже другой чемодан.', en: 'I left it by the wall opposite the door while I tied the umbrella. When I turned back, a different suitcase stood there.' },
      },
    ],
  },
  {
    passengerId: 'passenger-15',
    storyBeats: dayFourStoryBeats['passenger-15'],
    specialReaction: {
      annoyanceThreshold: 1, effect: 'tense',
      text: { ru: 'Замирает, не отводя взгляда. «Либо следующий вопрос поможет найти сумку, либо мы перестаём разговаривать. {detail}»', en: 'Goes still without looking away. “Either the next question helps find the bag, or we stop talking. {detail}”' },
    },
    opening: { ru: 'Здравствуйте. Я войду. Закройте дверь. У меня пропала тёмная дорожная сумка, и я хочу забрать её без лишних зрителей.', en: 'Hello. I am coming in. Close the door. My dark travel bag is missing, and I want it recovered without an audience.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета отличает её от остальных?', en: 'Which mark sets it apart from the others?' },
        response: { ru: 'Сбоку белая нашивка, а на ручке красная строчка. Обе детали сделаны вручную.', en: 'There is a white patch on the side and red stitching on the handle. Both were sewn by hand.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что нужно сверить внутри?', en: 'What should we verify inside?' },
        response: { ru: 'Зелёный шарф и складная куртка.', en: 'A green scarf and a foldable jacket.' },
      },
      {
        id: 'location',
        text: { ru: 'Где она исчезла?', en: 'Where did it disappear?' },
        response: { ru: 'У дальней стены. Я сдвинул её, чтобы пропустить человека, обернулся — и сумки уже не было.', en: 'By the far wall. I moved it aside to let someone pass, turned around—and the bag was gone.' },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
