import { DialogueBranch } from '../types';

export const contentsBranch = {
  clarify: [
    {
      id: 'contents-unique',
      text: { ru: 'Какая вещь внутри точно принадлежит вам?', en: 'Which item inside can only belong to you?' },
      response: {
        ru: 'Есть одна вещь, которую я узнаю сразу. Главное содержимое: {detail}',
        en: 'There is one item I would recognize at once. The main contents are: {detail}',
      },
    },
    {
      id: 'contents-hidden-mark',
      text: { ru: 'На одной из вещей есть скрытая отметка?', en: 'Does one of the items have a hidden mark?' },
      response: {
        ru: 'Да. Я назову её при проверке, а пока ищите вот это: {detail}',
        en: 'Yes. I will name it during the check; for now, look for this: {detail}',
      },
    },
    {
      id: 'contents-hiding',
      annoyance: 1,
      text: { ru: 'Перебить: «Вы что-то скрываете о содержимом?»', en: 'Interrupt: “Are you hiding something about the contents?”' },
      response: {
        ru: '«Дайте договорить. Я сообщил всё, что нужно для поиска: {detail}»',
        en: '“Let me finish. I told you everything needed for the search: {detail}”',
      },
    },
  ],
  search: [
    {
      id: 'contents-check-together',
      text: { ru: 'Осмотрим подходящие сумки у стены вместе?', en: 'Shall we inspect the likely bags by the wall together?' },
      response: {
        ru: 'Да. Так мы сузим поиск, не перепутав чужие вещи.',
        en: 'Yes. That way we can narrow the search without mixing up anyone’s belongings.',
      },
    },
    {
      id: 'contents-private-detail',
      text: { ru: 'Назовите деталь вещи, которой не видно снаружи.', en: 'Name a detail that cannot be seen from outside.' },
      response: {
        ru: 'Хорошая проверка. Сначала найдите багаж — тогда я назову её.',
        en: 'Good test. Find the luggage first, and then I will name it.',
      },
    },
    {
      id: 'contents-search-without-owner',
      annoyance: 1,
      text: { ru: 'Открыть все карманы без вас?', en: 'Should I search every pocket without you?' },
      response: {
        ru: 'Нет. Я буду присутствовать. И ещё раз: {detail}',
        en: 'No. I will be present. And once again: {detail}',
      },
    },
  ],
  result: [
    {
      id: 'contents-mark-matched',
      text: { ru: 'Осталось три варианта. Какая скрытая отметка решит выбор?', en: 'Three options remain. Which hidden mark will decide it?' },
      response: {
        ru: '«Сейчас назову. Эту отметку мог знать только владелец».',
        en: '“I will name it now. Only the owner could know that mark.”',
      },
    },
    {
      id: 'contents-extra-item',
      text: { ru: 'У трёх сумок сходное содержимое. Что проверить последним?', en: 'Three bags have similar contents. What should we check last?' },
      response: {
        ru: '«Есть одна вещь с особой отметкой. По ней вы и выберете».',
        en: '“One item has a special mark. Use it to make your choice.”',
      },
    },
    {
      id: 'contents-prove-again',
      annoyance: 1,
      text: { ru: 'Докажите ещё раз, прежде чем я выберу сумку.', en: 'Prove it once more before I choose a bag.' },
      response: {
        ru: '«Довольно. Я назвал содержимое. Теперь слушайте последнюю деталь».',
        en: '“Enough. I named the contents. Now listen to the final detail.”',
      },
    },
  ],
} satisfies DialogueBranch;
