export type CatMood = 'happy' | 'sad' | 'sleepy' | 'hungry' | 'playful' | 'angry';

export interface Cat {
  id: string;
  name: string;
  image_url: string;
  mood: CatMood;
  updated_by: string;
  updated_at: string;
}
