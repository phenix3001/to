import { PassengerDialogue } from './types';
import { dayTwoStoryBeats } from './stories/day-2';

export const dayTwoDialogues = [
  {
    passengerId: 'passenger-04',
    storyBeats: dayTwoStoryBeats['passenger-04'],
    specialReaction: {
      annoyanceThreshold: 1, effect: 'tap',
      text: { ru: 'Нетерпеливо постукивает по часам и кивает на следы в пыли. «Время идёт. Ищите по тому, что я уже назвал: {detail}»', en: 'Taps their watch impatiently and nods toward the marks in the dust. “Time is passing. Search using what I already told you: {detail}”' },
    },
    opening: { ru: 'Добрый день. Дверь наконец освободилась. В коридоре очередь почти не движется, поэтому давайте сразу искать мой чёрный чемодан.', en: 'Good afternoon. The room is finally free. The queue outside is barely moving, so let us find my black suitcase without delay.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'По каким приметам будем отбирать чемоданы?', en: 'Which details should we use to narrow them down?' },
        response: {
          ru: 'Чёрный корпус, три золотые наклейки и накладка на левом углу. На накладке глубокая диагональная царапина.',
          en: 'A black shell, three gold stickers, and a guard on the left corner. The guard has a deep diagonal scratch.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Что внутри поможет подтвердить владельца?', en: 'What inside will confirm the owner?' },
        response: {
          ru: 'Серое пальто и деревянная коробка. На дне коробки выжжена маленькая звезда — это главная проверка.',
          en: 'A gray coat and a wooden box. A tiny star is burned into the box’s bottom—that is the decisive check.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Откуда мог начаться его путь по комнате?', en: 'Where might its path through the room begin?' },
        response: {
          ru: 'Незадолго до заката он стоял у двери. На потёртом полу остались две параллельные полосы от колёс, ведущие к левой стене.',
          en: 'It stood by the door shortly before sunset. Two parallel wheel marks lead across the worn floor toward the left wall.',
        },
      },
    ],
  },
  {
    passengerId: 'passenger-05',
    storyBeats: dayTwoStoryBeats['passenger-05'],
    specialReaction: {
      annoyanceThreshold: 1, effect: 'tense',
      text: { ru: 'Медленно проводит пальцем по красному ремню найденной сумки. «Повторять не стану. Сверяйте внимательно: {detail}»', en: 'Slowly runs one finger along the red strap of a found bag. “I will not repeat myself. Compare carefully: {detail}”' },
    },
    opening: { ru: 'Здравствуйте. Я закрыл за собой дверь — шум из коридора мешает думать. Пропала длинная серая сумка; осмотрим комнату спокойно.', en: 'Hello. I closed the door behind me—the noise outside makes it hard to think. A long gray bag is missing; we will search the room quietly.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какую примету искать снаружи?', en: 'Which exterior mark should we look for?' },
        response: {
          ru: 'Она длинная, серая, с красным ремнём. Возле бокового кармана засохло белое пятно краски — не пытайтесь его стереть.',
          en: 'It is long and gray with a red strap. A white paint mark dried beside the side pocket—do not try to wipe it off.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Чем проверим сумку изнутри?', en: 'How do we verify the bag from inside?' },
        response: {
          ru: 'Там свёрнутый плед и настольная игра. Все фишки на месте, кроме синей — она лежит отдельно под ремнём.',
          en: 'There is a rolled blanket and a board game. Every piece is in the box except the blue one—it is kept separately beneath the strap.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Где осмотрим в первую очередь?', en: 'Where should we search first?' },
        response: {
          ru: 'Днём она стояла у голой стены. На штукатурке осталась белая полоса, а в пыли видно, как сумку тащили в сторону двери.',
          en: 'It stood by the bare wall this afternoon. A white streak remains on the plaster, and the dust shows the bag was dragged toward the door.',
        },
      },
    ],
  },
  {
    passengerId: 'passenger-06',
    storyBeats: dayTwoStoryBeats['passenger-06'],
    specialReaction: {
      annoyanceThreshold: 3, effect: 'nervous',
      text: { ru: 'Нервно сжимает рукава и заглядывает за цветочный горшок. «Простите, но я уже всё рассказал. Пожалуйста, запомните: {detail}»', en: 'Nervously grips their sleeves and peers behind the flowerpot. “Sorry, but I already told you everything. Please remember: {detail}”' },
    },
    opening: { ru: 'Привет. В коридоре холодно, поэтому я всё-таки решился войти. Я потерял розовый тканевый чемодан — можно я буду искать вместе с вами?', en: 'Hi. It is cold outside, so I finally worked up the nerve to come in. I lost a pink fabric suitcase—may I search with you?' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Какие детали заметим первыми?', en: 'Which details will we notice first?' },
        response: {
          ru: 'Розовая ткань, круглая заплатка над маленькой дыркой и брелок-облако. Брелок мог оторваться, поэтому важнее заплатка.',
          en: 'Pink fabric, a round patch over a small tear, and a cloud keychain. The keychain may have come loose, so the patch matters more.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Что внутри точно ваше?', en: 'What inside is unmistakably yours?' },
        response: {
          ru: 'Полосатый свитер и плюшевый кролик. Одно ухо кролика зашито толстой фиолетовой ниткой.',
          en: 'A striped sweater and a toy rabbit. One of the rabbit’s ears is sewn with thick purple thread.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Где мог оторваться брелок?', en: 'Where might the keychain have come off?' },
        response: {
          ru: 'Чемодан стоял у стены возле увядшего цветка. Розовая нитка тянется оттуда к дверной ручке, а под горшком виднеется что-то голубое.',
          en: 'The suitcase stood by the wall near the wilted flower. A pink thread runs from there to the door handle, and something blue shows beneath the pot.',
        },
      },
    ],
  },
  {
    passengerId: 'passenger-07',
    storyBeats: dayTwoStoryBeats['passenger-07'],
    specialReaction: {
      annoyanceThreshold: 1, effect: 'slam',
      text: { ru: 'Резко хлопает ладонью по крышке чемодана. На миг комната темнеет. «Хватит перезапускать вопрос. Ответ не изменился: {detail}»', en: 'Slaps a palm sharply on a suitcase lid. The room goes dark for an instant. “Stop restarting the question. The answer has not changed: {detail}”' },
    },
    opening: { ru: 'Добрый вечер. Я открыл дверь сам — именно так начинался предыдущий вариант этой сцены. Тогда на месте голой стены был светлый офис. Сейчас мне нужна маленькая коричневая сумка.', en: 'Good evening. I opened the door myself—exactly how the previous version of this scene began. Last time a bright office stood where the bare wall is now. I need my small brown bag.' },
    choices: [
      {
        id: 'feature',
        text: { ru: 'Что отличает её от похожих сумок?', en: 'What distinguishes it from similar bags?' },
        response: {
          ru: 'Коричневая кожа, латунная застёжка и царапина-полумесяц справа. Тень на голой стене почему-то повторяет даже эту мелкую царапину.',
          en: 'Brown leather, a brass clasp, and a crescent scratch on the right. Its shadow on the bare wall somehow reproduces even that tiny mark.',
        },
      },
      {
        id: 'contents',
        text: { ru: 'Что должно быть внутри?', en: 'What should be inside?' },
        response: {
          ru: 'Вязаные перчатки и старый фотоаппарат. На плёнке было двадцать семь кадров. Если теперь их двадцать восемь, кто-то добавил сцену без моего участия.',
          en: 'Knitted gloves and an old camera. The roll held twenty-seven frames. If there are twenty-eight now, someone added a scene without me.',
        },
      },
      {
        id: 'location',
        text: { ru: 'Где начнём поиск?', en: 'Where should we begin the search?' },
        response: {
          ru: 'Она лежала у закрытой двери. Я помню, как её унесли к правой стене, и одновременно помню, что она всё ещё была у моих ног.',
          en: 'It lay beside the closed door. I remember it being carried to the right wall, and at the same time I remember it still resting by my feet.',
        },
      },
    ],
  },
] satisfies readonly PassengerDialogue[];
