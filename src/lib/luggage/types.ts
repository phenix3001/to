export type LuggageLicense = 'CC-BY 3.0' | 'CC0 1.0';

export interface RealSuitcase {
  id: string;
  title: { ru: string; en: string };
  author: string;
  license: LuggageLicense;
  modelUrl: string;
  imageUrl: string;
  sourceUrl: string;
  contents?: { ru: string; en: string };
  animations?: {
    open: string;
    close: string;
  };
  tint?: string;
}
