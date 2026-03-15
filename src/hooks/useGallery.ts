import { useState, useEffect, useCallback } from 'react';
import * as galleryService from '../services/galleryService';
import type { Album, Photo } from '../types/gallery';

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = useCallback(async () => {
    try {
      const data = await galleryService.getAlbums();
      setAlbums(data);
    } catch (err) {
      console.error('Failed to fetch albums:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAlbums(); }, [fetchAlbums]);

  const createAlbum = async (name: string, tags: string[], category: string | null, createdBy: string) => {
    await galleryService.createAlbum(name, tags, category, createdBy);
    await fetchAlbums();
  };

  const deleteAlbum = async (id: string) => {
    setAlbums(prev => prev.filter(a => a.id !== id));
    await galleryService.deleteAlbum(id);
  };

  return { albums, createAlbum, deleteAlbum, loading, refetch: fetchAlbums };
}

export function usePhotos(albumId: string | null) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    if (!albumId) return;
    setLoading(true);
    try {
      const data = await galleryService.getPhotos(albumId);
      setPhotos(data);
    } catch (err) {
      console.error('Failed to fetch photos:', err);
    } finally {
      setLoading(false);
    }
  }, [albumId]);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  const uploadPhoto = async (file: File, uploadedBy: string) => {
    if (!albumId) return;
    await galleryService.uploadPhoto(albumId, file, uploadedBy);
    await fetchPhotos();
  };

  const deletePhoto = async (id: string, storagePath: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    await galleryService.deletePhoto(id, storagePath);
  };

  return { photos, uploadPhoto, deletePhoto, loading };
}
