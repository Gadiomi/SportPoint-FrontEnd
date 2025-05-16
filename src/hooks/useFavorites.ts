import { useEffect, useState } from 'react';
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '@/redux/details/favoritesApi';

export const useFavorites = (
  id: string | undefined,
  role: string,
  isLogin: boolean,
  onUnauthorized?: () => void,
) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const { data: favoritesData, refetch } = useGetFavoritesQuery({ role });

  useEffect(() => {
    if (!id || !Array.isArray(favoritesData?.data)) return;
    const isInFavorites = favoritesData.data.some((fav: any) => fav._id === id);
    setIsFavorite(isInFavorites);
  }, [favoritesData, id]);

  const toggleFavorite = async () => {
    if (!isLogin) {
      onUnauthorized?.();
      return;
    }

    if (!id || !role) return;

    try {
      if (!isFavorite) {
        await addToFavorites({ id, data: { role } }).unwrap();
        setIsFavorite(true);
      } else {
        await removeFromFavorites({ id }).unwrap();
        setIsFavorite(false);
      }
      await refetch();
    } catch (err: any) {
      console.error('Помилка обробки улюбленого:', err);
      if (err?.status === 409) {
        alert('Ця картка вже є в улюблених');
      }
    }
  };

  return { isFavorite, toggleFavorite };
};
