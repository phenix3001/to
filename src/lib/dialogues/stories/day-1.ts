import type { DialogueStoryBeats } from '../types';

export const dayOneStoryBeats = {
  'passenger-01': [
    {
      ru: 'Вы вместе идёте по прерывистому следу колёс через пыль. Он заканчивается у дальней голой стены, где стоят несколько тёмно-синих чемоданов.',
      en: 'Together you follow a broken wheel trail through the dust. It ends at the far bare wall, where several dark blue suitcases stand.',
    },
    {
      ru: 'Вы выставляете похожие чемоданы на потёртый пол. У одного вмятина слева, на другом лента завязана новым узлом. Посетитель приседает и сверяет правые бока.',
      en: 'You set the similar cases on the worn floor. One is dented on the left; another has its ribbon tied in a new knot. The visitor crouches and compares their right sides.',
    },
    {
      ru: 'Вдоль голой стены остаются три кандидата. «Выбирайте тот, у которого глубокая вмятина именно справа; после этого я проверю рисунок фонаря в альбоме».',
      en: 'Three candidates remain along the bare wall. “Choose the one with the deep dent specifically on the right; then I will verify the lamp drawing in the sketchbook.”',
    },
  ],
  'passenger-02': [
    {
      ru: 'Вы начинаете от закрытой двери. Посетитель идёт рядом и позвякивает ключами, сравнивая звук с тихим звоном из угла с увядшим цветком.',
      en: 'You begin at the closed door. The visitor walks beside you, jingling their keys and comparing the sound with a faint ring near the wilted flower.',
    },
    {
      ru: 'По следам в пыли вы находите у стены несколько жёлтых рюкзаков. На одном клубника напечатана, на другом пришита ровными фабричными стежками.',
      en: 'Following marks in the dust, you find several yellow backpacks by the wall. One has a printed strawberry; another has neat factory stitching.',
    },
    {
      ru: 'Три рюкзака выстраивают вдоль голой стены. «У моего один листик клубники короче, колокольчик треснут сбоку, а красный шарф лежит именно в боковом кармане».',
      en: 'Three backpacks are lined up along the bare wall. “Mine has one shorter strawberry leaf, a bell cracked on the side, and the red scarf specifically in the side pocket.”',
    },
  ],
  'passenger-03': [
    {
      ru: 'Он без подсказки идёт к углу с увядшим цветком, будто уже проходил эту сцену. На пыльном полу рядом стоят несколько зелёных сумок с белыми полосами.',
      en: 'Without prompting, the visitor walks toward the wilted flower as if this scene has happened before. Several green bags with white stripes stand nearby on the dusty floor.',
    },
    {
      ru: 'Вы осматриваете ручки. Синяя нитка есть на двух сумках; в одной книге спрятан билет в кино с сегодняшней датой и номером места, на котором сейчас стоишь ты.',
      en: 'You inspect the handles. Two bags have blue thread; inside one book is a cinema ticket dated today, bearing the number of the spot where you are standing.',
    },
    {
      ru: 'Вдоль голой стены остаются три зелёные сумки. «Не смотри на билет. Ищи ручку, где последние три синих стежка складываются в невозможную цифру, затем проверь мою подпись в книге».',
      en: 'Three green bags remain along the bare wall. “Ignore the ticket. Find the handle whose last three blue stitches form an impossible number, then check my signature in the book.”',
    },
  ],
} satisfies Record<string, DialogueStoryBeats>;
