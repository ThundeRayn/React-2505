export interface Album {
  id: string;
  name: string;
  tags: string[];
  category: string | null;
  created_by: string;
  created_at: string;
  cover_url?: string;
  photo_count?: number;
}

export interface Photo {
  id: string;
  album_id: string;
  storage_path: string;
  uploaded_by: string;
  created_at: string;
  url?: string;
}
