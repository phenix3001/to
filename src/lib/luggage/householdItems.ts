import type { LuggageLicense } from './types';

export interface HouseholdItem {
  id: string;
  emoji: string;
  label: { ru: string; en: string };
  author: string;
  license: LuggageLicense;
  modelUrl: string;
  imageUrl: string;
  sourceUrl: string;
}

function item(
  id: string,
  emoji: string,
  ru: string,
  en: string,
  author: string,
  license: LuggageLicense,
  sourceId: string,
): HouseholdItem {
  return {
    id,
    emoji,
    label: { ru, en },
    author,
    license,
    modelUrl: `/models/items/${id}.glb`,
    imageUrl: `/images/items/${id}.png`,
    sourceUrl: `https://poly.pizza/m/${sourceId}`,
  };
}

export const householdItems = [
  item('tshirt', '👕', 'Футболка', 'T-shirt', 'sirkitree', 'CC-BY 3.0', '9f0V6nrgz_P'),
  item('socks', '🧦', 'Носки', 'Socks', 'MiniPoly', 'CC-BY 3.0', 'hcfzStK2HR'),
  item('toothbrush', '🪥', 'Зубная щётка', 'Toothbrush', 'Isa Lousberg', 'CC0 1.0', 'Q9sYJ2UOZp'),
  item('soap', '🧼', 'Мыло', 'Soap', 'Poly by Google', 'CC-BY 3.0', '3QFZzJfDCmx'),
  item('comb', '🪮', 'Расчёска', 'Comb', 'Poly by Google', 'CC-BY 3.0', '35DXCGSBkOo'),
  item('phone', '📱', 'Телефон', 'Phone', 'Quaternius', 'CC0 1.0', 'k2kgBepoMU'),
  item('book', '📖', 'Книга', 'Book', 'Quaternius', 'CC0 1.0', 'h3Wh4fxSQX'),
  item('headphones', '🎧', 'Наушники', 'Headphones', 'CreativeTrio', 'CC0 1.0', 'PSsWSIAYIL'),
  item('water-bottle', '🧴', 'Бутылка', 'Water bottle', 'Quaternius', 'CC0 1.0', 'KpxDpidn1Z'),
  item('keys', '🔑', 'Ключи', 'Keys', 'Poly by Google', 'CC-BY 3.0', 'b1XMMDEWe1i'),
  item('wallet', '👛', 'Кошелёк', 'Wallet', 'Poly by Google', 'CC-BY 3.0', '2rqMOZG3RU_'),
  item('camera', '📷', 'Камера', 'Camera', 'Poly by Google', 'CC-BY 3.0', '0nfSsetwy0Z'),
  item('cable', '➰', 'Кабель', 'Cable', 'Quaternius', 'CC0 1.0', 'aoNcGMnNiG'),
  item('charger', '🔌', 'Зарядка', 'Charger', 'Poly by Google', 'CC-BY 3.0', 'fzuE9mR4WR6'),
  item('towel', '🧻', 'Полотенце', 'Towel', 'Poly by Google', 'CC-BY 3.0', 'dlPdtZek_-B'),
  item('lotion', '🧴', 'Флакон', 'Lotion bottle', 'MilkAndBanana', 'CC0 1.0', '0DrOqa1GJ7'),
] as const;

const selectionStrides = [1, 3, 5] as const;

export function getHouseholdItems(luggageNumber: number): HouseholdItem[] {
  const variant = luggageNumber - 1;
  const group = Math.floor(variant / householdItems.length);
  const start = (variant * 5 + group * 2) % householdItems.length;
  const stride = selectionStrides[group % selectionStrides.length];
  const itemCount = 4 + (variant % 3);

  return Array.from({ length: itemCount }, (_, index) => {
    const itemIndex = (start + index * stride) % householdItems.length;
    return householdItems[itemIndex];
  });
}
