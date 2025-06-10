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
  isLogin,
}: UseFavoritesMapProps) => {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const { data: favoritesData, refetch } = useGetFavoritesQuery(
    { role },
    { skip: !isLogin },
  );

  useEffect(() => {
    if (isLogin) {
      refetch();
    }
  }, [isLogin, refetch]);

  useEffect(() => {
    if (
      !favoritesData?.data ||
      !Array.isArray(favoritesData.data) ||
      ids.length === 0
    )
      return;

    const favoriteUserIds = new Set(
      favoritesData.data
        .filter((fav: any) => fav.userId)
        .map((fav: any) => fav.userId.toString()),
    );

    const map: Record<string, boolean> = {};
    ids.forEach(id => {
      map[id] = favoriteUserIds.has(id);
    });

    console.log('🗺️ Створена favoritesMap:', map);

    setFavoritesMap(map);
  }, [favoritesData?.data, ids]);

  console.log('favoritesMap:', ids);

  const toggleFavorite = async (id: string) => {
    if (!isLogin) return;

    try {
      if (!favoritesMap[id]) {
        console.log(`Додаємо до улюблених: id = ${id}`);
        await addToFavorites({ id, data: { role } }).unwrap();
        setFavoritesMap(prev => ({ ...prev, [id]: true }));
        console.log(`Успішно додано до улюблених: id = ${id}`);
      } else {
        console.log('Видаляємо обране з id:', id);
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
