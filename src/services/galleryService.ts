import { supabase } from '../lib/supabase';
import type { Album, Photo } from '../types/gallery';

export async function getAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from('albums')
    .select('*, photos(count)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((a: any) => ({
    ...a,
    photo_count: a.photos?.[0]?.count || 0,
    photos: undefined,
  }));
}

export async function createAlbum(name: string, tags: string[], category: string | null, createdBy: string) {
  const { error } = await supabase
    .from('albums')
    .insert({ name, tags, category, created_by: createdBy });
  if (error) throw error;
}

export async function deleteAlbum(id: string) {
  // Delete all photos in album first
  const { data: photos } = await supabase.from('photos').select('storage_path').eq('album_id', id);
  if (photos && photos.length > 0) {
    await supabase.storage.from('gallery').remove(photos.map(p => p.storage_path));
    await supabase.from('photos').delete().eq('album_id', id);
  }
  const { error } = await supabase.from('albums').delete().eq('id', id);
  if (error) throw error;
}

export async function getPhotos(albumId: string): Promise<Photo[]> {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('album_id', albumId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(p => ({
    ...p,
    url: supabase.storage.from('gallery').getPublicUrl(p.storage_path).data.publicUrl,
  }));
}

export async function uploadPhoto(albumId: string, file: File, uploadedBy: string) {
  const ext = file.name.split('.').pop();
  const path = `${albumId}/${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from('gallery').upload(path, file);
  if (uploadError) throw uploadError;
  const { error: dbError } = await supabase
    .from('photos')
    .insert({ album_id: albumId, storage_path: path, uploaded_by: uploadedBy });
  if (dbError) throw dbError;
}

export async function deletePhoto(id: string, storagePath: string) {
  await supabase.storage.from('gallery').remove([storagePath]);
  const { error } = await supabase.from('photos').delete().eq('id', id);
  if (error) throw error;
}
