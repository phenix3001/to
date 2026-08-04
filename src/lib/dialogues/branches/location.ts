import { DialogueBranch } from '../types';

export const locationBranch = {
  clarify: [
    {
      id: 'location-next-moment',
      text: { ru: 'Что произошло сразу после того, как вы ушли?', en: 'What happened immediately after you walked away?' },
      response: {
        ru: 'Я отвлёкся всего на минуту. Последнее место помню точно: {detail}',
        en: 'I looked away for only a minute. I remember the last place exactly: {detail}',
      },
    },
    {
      id: 'location-witness',
      text: { ru: 'Кто-нибудь мог видеть, как багаж перенесли?', en: 'Could anyone have seen the luggage being moved?' },
      response: {
        ru: 'Рядом кто-то проходил, но лица я не запомнил. После этого багаж исчез.',
        en: 'Someone passed nearby, but I did not see their face. Then the luggage vanished.',
      },
    },
    {
      id: 'location-invented',
      annoyance: 1,
      text: { ru: 'Перебить: «Вы не придумали это место?»', en: 'Interrupt: “Did you invent that location?”' },
      response: {
        ru: '«Не перебивайте. Я уже ясно сказал, где всё произошло: {detail}»',
        en: '“Do not interrupt me. I already told you exactly where it happened: {detail}”',
      },
    },
  ],
  search: [
    {
      id: 'location-follow-trace',
      text: { ru: 'Осмотрим старый пол — тяжёлый багаж мог оставить след.', en: 'Let us inspect the worn floor—a heavy bag may have left a trail.' },
      response: {
        ru: 'Хорошая мысль. След должен вести от того места, где я его оставил.',
        en: 'Good idea. The trail should begin where I left it.',
      },
    },
    {
      id: 'location-search-beyond',
      text: { ru: 'Проверим не само место, а ближайшие укрытия.', en: 'Let us search the nearby hiding places instead of the exact spot.' },
      response: {
        ru: 'Да. Тот, кто двигал багаж, вряд ли унёс его далеко.',
        en: 'Yes. Whoever moved it probably did not carry it far.',
      },
    },
    {
      id: 'location-retell',
      annoyance: 1,
      text: { ru: 'Расскажите всю историю ещё раз.', en: 'Tell the whole story again.' },
      response: { ru: 'Мы теряем время. Всё началось здесь: {detail}', en: 'We are wasting time. It began here: {detail}' },
    },
  ],
  result: [
    {
      id: 'location-moved-bag',
      text: { ru: 'След привёл к трём сумкам у дальней стены. Что искать?', en: 'The trail led to three bags by the far wall. What should I look for?' },
      response: {
        ru: '«Значит, их действительно переносили. Последняя примета укажет на мою».',
        en: '“Then they really were moved. The final mark will identify mine.”',
      },
    },
    {
      id: 'location-two-bags',
      text: { ru: 'Рядом нашлись три похожие сумки. Проверим тайную примету?', en: 'Three similar bags were nearby. Shall we test a private detail?' },
      response: {
        ru: '«Да. Я назову деталь, а выбирать среди них будете вы».',
        en: '“Yes. I will name the detail, and you will choose among them.”',
      },
    },
    {
      id: 'location-still-doubt',
      annoyance: 1,
      text: { ru: 'Место совпало, но перед выбором я всё ещё сомневаюсь.', en: 'The location matches, but I still have doubts before choosing.' },
      response: {
        ru: '«Тогда проверьте последнюю скрытую примету и решайте сами».',
        en: '“Then check the final hidden mark and decide for yourself.”',
      },
    },
  ],
} satisfies DialogueBranch;
