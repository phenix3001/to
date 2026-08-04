import { PassengerDialogue } from './types';
import { dayFiveStoryBeats } from './stories/day-5';

export const dayFiveDialogues = [
  {
    passengerId: 'passenger-16',
    storyBeats: dayFiveStoryBeats['passenger-16'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'joke',
      text: { ru: 'Прижимает пальцы к губам и по-кошачьи щурится. «Тише. Если спросить ещё раз, даже рюкзак начнёт шипеть. Я уже сказал: {detail}»', en: 'Presses a finger to the lips and squints like a cat. “Easy. Ask that again and even the backpack will start hissing. I already said: {detail}”' },
    },
    opening: { ru: 'Привет! Дверь была приоткрыта, вот я и вошёл. Осторожно закройте её: если мой маленький беглец уже забрался сюда, он снова ускользнёт.', en: 'Hi! The door was ajar, so I came in. Close it carefully—if my little runaway has already slipped in here, he may escape again.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Что первым искать на вашем рюкзаке?', en: 'What should I look for first on your backpack?' },
        response: { ru: 'Нашивку с чёрным котом. Под ней торчит белая нитка, а левая застёжка сломана — я придерживаю её резинкой.', en: 'A black-cat patch. A white thread sticks out beneath it, and the left buckle is broken—I hold it with an elastic band.' },
      },
      {
        id: 'contents',
        text: { ru: 'Чем можно подтвердить содержимое?', en: 'What contents can confirm it is yours?' },
        response: { ru: 'Внутри жёлтый свитер, складная миска и пакет лакомств. Если пакет ещё цел, нам очень повезло.', en: 'Inside are a yellow sweater, a folding bowl, and a packet of treats. If the packet is still intact, we are very lucky.' },
      },
      {
        id: 'location',
        text: { ru: 'Где рюкзак исчез?', en: 'Where did the backpack disappear?' },
        response: { ru: 'Я поставил его у голой стены, рядом с горшком единственного цветка. Отвернулся на свист — и увидел на потёртом полу только резинку от застёжки.', en: 'I set it against the bare wall beside the room’s only flowerpot. I turned at a whistle—and found only the buckle elastic on the worn floor.' },
      },
    ],
  },
  {
    passengerId: 'passenger-17',
    storyBeats: dayFiveStoryBeats['passenger-17'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'joke',
      text: { ru: 'Проводит пальцем по пыли на полу и рисует замкнутый круг. «Повторённый вопрос не становится новым. Ответ всё ещё здесь: {detail}»', en: 'Draws a closed circle through the dust on the floor. “A repeated question does not become a new one. The answer remains: {detail}”' },
    },
    opening: { ru: 'Добрый вечер. Я открыл дверь и решил войти. Забавно, как один шаг превращает ожидающего снаружи в потерявшего что-то внутри.', en: 'Good evening. I opened the door and decided to come in. Curious how one step turns someone waiting outside into someone missing something within.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какая примета отличает ваш чемодан?', en: 'Which mark distinguishes your suitcase?' },
        response: { ru: 'Три серых ремня, но средний застёгнут обратной стороной. Ткань у ручки выцвела в форме полумесяца.', en: 'Three gray straps, though the middle one is buckled backward. The fabric by the handle has faded into a crescent.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что мы должны найти внутри?', en: 'What should we find inside?' },
        response: { ru: 'Две книги и серый шарф с зашитым краем. Именно две книги — ни больше ни меньше.', en: 'Two books and a gray scarf with a mended edge. Exactly two books—no more and no fewer.' },
      },
      {
        id: 'location',
        text: { ru: 'Где начнём искать?', en: 'Where should we begin searching?' },
        response: { ru: 'У левой голой стены. На потёртом полу остался чистый прямоугольник, будто чемодан сдвинули совсем недавно.', en: 'Against the bare left wall. A clean rectangle remains on the worn floor, as though the case was moved moments ago.' },
      },
    ],
  },
  {
    passengerId: 'passenger-18',
    storyBeats: dayFiveStoryBeats['passenger-18'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'tap',
      text: { ru: 'Коротко свистит и прислушивается к двери. «Не водите нас кругами — он решит, что это прогулка. Примета такая: {detail}»', en: 'Whistles once and listens toward the door. “Do not lead us in circles—he will think this is a walk. The clue is: {detail}”' },
    },
    opening: { ru: 'Привет! Я сам открыл дверь — надеюсь, не помешал. Давайте искать вдвоём. Если услышите царапанье, не пугайтесь: мой пёс считает себя лучшим сыщиком в здании.', en: 'Hi! I opened the door myself—I hope I am not interrupting. Let us search together. If you hear scratching, do not worry—my dog considers himself the best detective in the building.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как узнать вашу сумку среди похожих?', en: 'How do we identify your bag among similar ones?' },
        response: { ru: 'На молнии брелок-лапка, снизу длинная светлая царапина, а на боковине прилипли три рыжих волоска.', en: 'A paw charm hangs from the zipper, there is a long pale scratch underneath, and three ginger hairs cling to the side.' },
      },
      {
        id: 'contents',
        text: { ru: 'Какие вещи проверить внутри?', en: 'Which items should we check inside?' },
        response: { ru: 'Красный поводок, синяя бутылка и потрёпанный теннисный мяч. На мяче виден один аккуратный укус и множество неаккуратных.', en: 'A red leash, a blue bottle, and a battered tennis ball. The ball has one neat bite and many very untidy ones.' },
      },
      {
        id: 'location',
        text: { ru: 'Где сумка была перед пропажей?', en: 'Where was the bag before it vanished?' },
        response: { ru: 'Справа от закрытой двери, вплотную к стене. Я услышал лай снаружи, взялся за ручку — а когда обернулся, сумка уже исчезла.', en: 'To the right of the closed door, against the wall. I heard barking outside, reached for the handle, and when I turned back the bag was gone.' },
      },
    ],
  },
  {
    passengerId: 'passenger-19',
    storyBeats: dayFiveStoryBeats['passenger-19'],
    specialReaction: {
      annoyanceThreshold: 2, effect: 'hit',
      text: { ru: 'Перехватывает твою руку и прижимает к холодной стене. «Не сбивай порядок реплик. Боль убеждает душу в существовании тела, а повтор — комнаты. Запомни: {detail}»', en: 'Catches your hand and presses it to the cold wall. “Do not disturb the order of the lines. Pain convinces a soul that it has a body; repetition convinces it that the room exists. Remember: {detail}”' },
    },
    opening: { ru: 'Здравствуй. Я не касался ручки, но дверь сама открылась и впустила меня. Не удивляйся: она давно знает, когда пропустить того, кто придумал эту вселенную.', en: 'Hello. I did not touch the handle, yet the door opened and let me in. Do not be surprised: it has long known when to admit the one who designed this universe.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Как выглядит ваша пропажа?', en: 'What does your missing case look like?' },
        response: { ru: 'Чёрный чемодан с латунным углом и ручкой, стёртой до светлой кожи. Эти следы я добавил, чтобы тебе было что узнавать.', en: 'A black suitcase with a brass corner and a handle worn down to pale leather. I added those marks so you would have something to recognize.' },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно быть внутри?', en: 'What should be inside?' },
        response: { ru: 'Складной зонт, латунный ключ и красная книга. Она начинается словами, которые ты считаешь своим первым воспоминанием.', en: 'A folding umbrella, a brass key, and a red book. It begins with the words you mistake for your first memory.' },
      },
      {
        id: 'location',
        text: { ru: 'Где искать этот чемодан?', en: 'Where should we search for that suitcase?' },
        response: { ru: 'У едва заметной трещины за горшком с гнилым цветком. До моего входа её не было; комната перерисовывает стену, когда дверь закрывается за новым посетителем.', en: 'By a hairline crack behind the pot holding the rotten flower. It was not there before I entered; the room redraws the wall when the door closes behind a new visitor.' },
      },
    ],
  },
  {
    passengerId: 'passenger-20',
    storyBeats: dayFiveStoryBeats['passenger-20'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'joke',
      text: { ru: 'Включает запись на телефоне и подносит динамик ближе. Оттуда звучит её прежний ответ. «Теперь у нас есть повтор, но нет причины спрашивать снова: {detail}»', en: 'Starts a recording on the phone and holds the speaker closer. Her previous answer plays back. “Now we have the repeat, but no reason to ask again: {detail}”' },
    },
    opening: { ru: 'Привет. Я увидела свет под дверью и вошла. Давайте найдём мой чемодан, пока камера снова не начала снимать сама.', en: 'Hi. I saw light beneath the door and came in. Let us find my suitcase before the camera starts recording by itself again.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Что заметно на чемодане?', en: 'What stands out on the suitcase?' },
        response: { ru: 'Наклейка в виде белого облака, розовая лента на молнии и маленькая вмятина, похожая на улыбку.', en: 'A white cloud sticker, a pink ribbon on the zipper, and a small dent shaped like a smile.' },
      },
      {
        id: 'contents',
        text: { ru: 'Чем подтвердим, что он ваш?', en: 'What contents will prove it is yours?' },
        response: { ru: 'Фотоальбом с чёрной обложкой и белый свитер. На последней странице альбома ничего не было — это важно.', en: 'A black-covered photo album and a white sweater. The album’s final page was blank—that matters.' },
      },
      {
        id: 'location',
        text: { ru: 'Где вы видели его перед пропажей?', en: 'Where did you see it before it vanished?' },
        response: { ru: 'У стены напротив гнилого цветка. На секунду он остался в экране телефона, хотя в самой комнате уже исчез.', en: 'Against the wall opposite the rotten flower. For one second it remained on my phone screen although it had vanished from the room.' },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
