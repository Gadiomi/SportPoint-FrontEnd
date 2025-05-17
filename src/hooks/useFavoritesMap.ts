import { useEffect, useState } from 'react';
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '@/redux/details/favoritesApi';

interface UseFavoritesMapProps {
  ids: string[];
  role: string;
  isLogin: boolean;
}

export const useFavoritesMap = ({
  ids,
  role,
  isLogin
}: UseFavoritesMapProps) => {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const { data: favoritesData } = useGetFavoritesQuery({ role });

  useEffect(() => {
    if (!favoritesData?.data || !Array.isArray(favoritesData.data)) return;

    const map: Record<string, boolean> = {};
    ids.forEach(id => {
      map[id] = favoritesData.data.some(
        (fav: any) => fav._id === id || fav.userId === id,
      );
    });
    setFavoritesMap(map);
  }, [favoritesData, ids]);

  const toggleFavorite = async (id: string) => {
      if (!isLogin) return;
      console.log('favoritesMap[id]:', favoritesMap[id]);

      try {
        if (!favoritesMap[id]) {
            console.log(`Додаємо до улюблених: id = ${id}`);
             await addToFavorites({ id, data: { role } }).unwrap();
            console.log(`Успішно додано з улюблених: id = ${id}`);
        } else {
            console.log(`Видаляємо з улюблених: id = ${id}`);
        await removeFromFavorites({ id }).unwrap();
            setFavoritesMap(prev => ({ ...prev, [id]: false }));
            console.log(`Успішно видалено з улюблених: id = ${id}`);
      }
    } catch (err: any) {
      console.error('Помилка при додаванні/видаленні улюбленого:', err);
    }
  };

  return { favoritesMap, toggleFavorite };
};
