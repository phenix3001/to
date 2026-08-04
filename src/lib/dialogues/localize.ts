import { LocalizedText } from '../investigationTypes';

export function insertDialogueDetail(
  copy: LocalizedText,
  detail: LocalizedText,
): LocalizedText {
  return {
    ru: copy.ru.replace('{detail}', detail.ru),
    en: copy.en.replace('{detail}', detail.en),
  };
}

export function appendDialogueBeat(
  copy: LocalizedText,
  beat: LocalizedText,
): LocalizedText {
  return {
    ru: `${copy.ru} ${beat.ru}`,
    en: `${copy.en} ${beat.en}`,
  };
}
