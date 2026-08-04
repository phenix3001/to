import { PassengerDialogue } from './types';
import { dayThreeStoryBeats } from './stories/day-3';

export const dayThreeDialogues = [
  {
    passengerId: 'passenger-08',
    storyBeats: dayThreeStoryBeats['passenger-08'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'joke',
      text: { ru: 'Отбивает пальцами знакомый ритм. «Давайте не пускать разговор по кругу. Я уже сказала: {detail}»', en: 'Taps out a familiar rhythm. “Let us not send this conversation in circles. I already told you: {detail}”' },
    },
    opening: { ru: 'Привет! Дверь была открыта, вот я и вошла. У меня пропал бирюзовый чемодан с аппаратурой. По дороге сюда эхо спело мою мелодию раньше меня. Я опять вспомнила море голубых огней за стеклом, но не саму сцену.', en: 'Hi! The door was open, so I came in. My turquoise suitcase with the music gear is missing. On my way here, the echo sang my melody before I did. Again, I remembered a sea of blue lights beyond glass, but not the stage itself.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как узнать ваш чемодан среди остальных?', en: 'How can I recognize your suitcase among the others?' },
        response: { ru: 'Он бирюзовый, с белой наклейкой-звездой и чёрным ремнём с бирюзовой строчкой.', en: 'It is turquoise, with a white star sticker and a black strap with turquoise stitching.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что мы должны найти внутри?', en: 'What should we find inside?' },
        response: { ru: 'Маленькая клавиатура, синий провод и блокнот. На первой странице — число 39 и мелодия, которую ты почему-то уже знаешь.', en: 'A small keyboard, a blue cable, and a notebook. The first page shows the number 39 and a melody you somehow already know.' },
      },
      {
        id: 'location',
        text: { ru: 'Где вы заметили пропажу?', en: 'Where did you notice it was missing?' },
        response: { ru: 'Днём я оставила его у облупленной стены рядом со входом, пока поправляла кабель. Через минуту чемодана уже не было.', en: 'I left it by a peeling wall near the entrance while I fixed a cable. A minute later, the suitcase was gone.' },
      },
    ],
  },
  {
    passengerId: 'passenger-09',
    storyBeats: dayThreeStoryBeats['passenger-09'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'tense',
      text: { ru: 'Сжимает кулак; костяшки белеют. «Сумка не станет ближе, если переспрашивать. Я сказал: {detail}»', en: 'Clenches a fist until the knuckles whiten. “The bag will not get any closer if you keep asking. I said: {detail}”' },
    },
    opening: { ru: 'Здорово. Дверь была открыта, я сам зашёл. Пропала моя красная спортивная сумка. И ещё: с утра в голове чужая шутка — «А ты вообще поднимаешь?» Не понимаю, почему это должно быть смешно.', en: 'Hey. The door was open, so I let myself in. My red sports bag is missing. One more thing: all morning, a stranger’s joke has been stuck in my head—“Do you even lift?” I do not understand why it is supposed to be funny.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какую примету проверить первой?', en: 'Which identifying mark should I check first?' },
        response: { ru: 'Чёрное дно и криво вышитую сбоку цифру семь. На другой красной сумке такой вышивки нет.', en: 'A black bottom and a crooked number seven stitched on the side. The other red bag does not have that embroidery.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно быть внутри?', en: 'What should be inside?' },
        response: { ru: 'Кроссовки, полотенце и синяя кепка.', en: 'Sneakers, a towel, and a blue cap.' },
      },
      {
        id: 'location',
        text: { ru: 'Где сумка пропала?', en: 'Where did the bag go missing?' },
        response: { ru: 'После дождя я поставил её под навесом у входа, чтобы вытереть руки. Когда обернулся, её уже не было.', en: 'After the rain, I set it beneath the entrance awning to dry my hands. When I turned back, it was gone.' },
      },
    ],
  },
  {
    passengerId: 'passenger-10',
    storyBeats: dayThreeStoryBeats['passenger-10'],
    specialReaction: {
      annoyanceThreshold: 1, effect: 'tense',
      text: { ru: 'Наклоняется ближе и говорит тише. «Ищите внимательнее, а не спрашивайте громче. {detail}»', en: 'Leans closer and lowers their voice. “Search more carefully instead of asking more loudly. {detail}”' },
    },
    opening: { ru: 'Добрый вечер. Я войду без церемоний. У меня исчез светлый чемодан. Я не люблю ждать — особенно когда пропадают мои вещи.', en: 'Good evening. I will come in without ceremony. My light-colored suitcase disappeared. I dislike waiting—especially when my belongings are missing.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как отличить его от похожих?', en: 'How can I distinguish it from similar suitcases?' },
        response: { ru: 'Он светлый, с зелёным ремнём, наклейкой-лисой и зелёной лентой на ручке.', en: 'It is light, with a green strap, a fox sticker, and green tape on the handle.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что нужно проверить внутри?', en: 'What should we verify inside?' },
        response: { ru: 'Одежда и маленький подарок в синей упаковке.', en: 'Clothes and a small gift in blue wrapping.' },
      },
      {
        id: 'location',
        text: { ru: 'Где он исчез?', en: 'Where did it disappear?' },
        response: { ru: 'Вчера я оставил его у тёмной входной двери и отошёл ответить на звонок. Вернулся — чемодана нет.', en: 'Yesterday, I left it by a dark entrance door and stepped away to answer a call. When I returned, the suitcase was gone.' },
      },
    ],
  },
  {
    passengerId: 'passenger-11',
    storyBeats: dayThreeStoryBeats['passenger-11'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'tap',
      text: { ru: 'Проводит пальцем по шву на дверной петле. «Это уже было сказано: {detail} Теперь давайте искать.»', en: 'Runs a finger along the seam of the door hinge. “That has already been said: {detail} Now let us search.”' },
    },
    opening: { ru: 'Здравствуйте. Дверь не была заперта, поэтому я вошёл. У меня пропал серый чемодан. Ваша дверная петля сварена неровно — привычка замечать такое.', en: 'Hello. The door was unlocked, so I came in. My gray suitcase is missing. Your door hinge was welded unevenly—I have a habit of noticing such things.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета точно выдаст ваш чемодан?', en: 'Which mark will identify your suitcase for certain?' },
        response: { ru: 'На ручке красная лента, а возле левого колеса вмятина. Из-за неё колесо щёлкает.', en: 'There is a red ribbon on the handle and a dent by the left wheel. The dent makes the wheel click.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно оказаться внутри?', en: 'What should be inside?' },
        response: { ru: 'Синяя куртка и пара рабочих перчаток.', en: 'A blue jacket and a pair of work gloves.' },
      },
      {
        id: 'location',
        text: { ru: 'Где вы оставили его перед пропажей?', en: 'Where did you leave it before it disappeared?' },
        response: { ru: 'У бетонной стены с длинной трещиной. Я отошёл осмотреть дверную петлю, а когда вернулся, чемодан исчез.', en: 'By a concrete wall with a long crack. I stepped away to inspect a door hinge; when I returned, the suitcase had vanished.' },
      },
    ],
  },
  {
    passengerId: 'passenger-12',
    storyBeats: dayThreeStoryBeats['passenger-12'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'nervous',
      text: { ru: 'Стряхивает пыль с рукава. «Я всё описал. Лучше проверим следы на полу: {detail}»', en: 'Brushes dust from a sleeve. “I have described everything. Let us check the marks on the floor instead: {detail}”' },
    },
    opening: { ru: 'Добрый день. Я сам зашёл — хотел спросить о пропавшей мягкой сумке. После рабочей смены эта пустая комната кажется непривычно тихой.', en: 'Good afternoon. I came in to ask about my missing soft travel bag. After a work shift, this empty room feels unnaturally quiet.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета поможет её найти?', en: 'Which detail will help us find it?' },
        response: { ru: 'На молнии зелёный шнурок, а боковой карман сильно потёрт.', en: 'There is a green cord on the zipper, and the side pocket is badly worn.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что мы должны проверить внутри?', en: 'What should we check inside?' },
        response: { ru: 'Полосатая рубашка и рабочие ботинки.', en: 'A striped shirt and work boots.' },
      },
      {
        id: 'location',
        text: { ru: 'Где сумка была перед пропажей?', en: 'Where was the bag before it disappeared?' },
        response: { ru: 'Вчера вечером она лежала у служебной двери после смены. Я отвлёкся на гудок, а когда повернулся, сумка исчезла.', en: 'It was beside the staff door after my shift yesterday evening. A horn distracted me; when I turned back, the bag was gone.' },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
