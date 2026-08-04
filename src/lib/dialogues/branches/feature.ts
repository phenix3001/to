import { DialogueBranch } from '../types';

export const featureBranch = {
  clarify: [
    {
      id: 'feature-rare',
      text: { ru: 'Какая из этих примет самая редкая?', en: 'Which detail is the hardest to mistake?' },
      response: {
        ru: 'Самая надёжная улика всё-таки здесь: {detail}',
        en: 'The strongest clue is still this: {detail}',
      },
    },
    {
      id: 'feature-uncertain',
      text: { ru: 'Что в описании вы могли перепутать?', en: 'What part of the description might be wrong?' },
      response: {
        ru: 'Освещение могло изменить оттенок, но остальное помню точно: {detail}',
        en: 'The light may have changed the shade, but I remember the rest: {detail}',
      },
    },
    {
      id: 'feature-accuse',
      annoyance: 1,
      text: { ru: 'Перебить: «Вы точно не описываете чужой багаж?»', en: 'Interrupt: “Are you sure you are not describing someone else’s luggage?”' },
      response: {
        ru: '«Не перебивайте. Я прекрасно помню собственный багаж: {detail}»',
        en: '“Do not interrupt me. I know my own luggage perfectly well: {detail}”',
      },
    },
  ],
  search: [
    {
      id: 'feature-check-rare',
      text: { ru: 'Осмотрим комнату и проверим редкую примету.', en: 'Let us inspect the room and check the rarest mark.' },
      response: {
        ru: 'Верно. Если она совпадёт, останется проверить мелочи.',
        en: 'Right. If it matches, only the smaller details remain.',
      },
    },
    {
      id: 'feature-compare',
      text: { ru: 'У стены появились похожие сумки. Сравним их рядом?', en: 'Similar bags have appeared by the wall. Shall we compare them side by side?' },
      response: {
        ru: 'Да. На одной из них обязательно выдаст себя старая примета.',
        en: 'Yes. An old mark will give the right one away.',
      },
    },
    {
      id: 'feature-repeat',
      annoyance: 1,
      text: { ru: 'Повторите всё описание с самого начала.', en: 'Repeat the entire description from the beginning.' },
      response: { ru: 'Опять? Хорошо: {detail}', en: 'Again? Fine: {detail}' },
    },
  ],
  result: [
    {
      id: 'feature-hidden-check',
      text: { ru: 'Мы оставили три подходящих чемодана. Назовёте скрытую примету?', en: 'We have three likely suitcases left. Can you name a hidden mark?' },
      response: {
        ru: '«Назову. Смотрите внимательно — она должна указать на один из трёх».',
        en: '“I will. Look carefully—it should identify one of the three.”',
      },
    },
    {
      id: 'feature-new-damage',
      text: { ru: 'У трёх сумок есть похожие следы. Что отличает вашу?', en: 'Three bags have similar marks. What sets yours apart?' },
      response: {
        ru: '«Старые повреждения я помню. Последняя примета должна остаться на месте».',
        en: '“I remember the old damage. The final mark should still be there.”',
      },
    },
    {
      id: 'feature-prove-again',
      annoyance: 1,
      text: { ru: 'Повторите доказательство, прежде чем я выберу.', en: 'Repeat the proof before I choose.' },
      response: {
        ru: '«Я уже назвал все приметы. Слушайте последнюю и выбирайте».',
        en: '“I already named every mark. Hear the final one and choose.”',
      },
    },
  ],
} satisfies DialogueBranch;
