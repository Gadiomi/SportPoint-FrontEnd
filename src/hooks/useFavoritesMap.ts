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
    console.log('💥 FULL favoritesData:', favoritesData);
  }, [favoritesData]);

  useEffect(() => {
    if (
      !favoritesData?.data ||
      !Array.isArray(favoritesData.data) ||
      ids.length === 0
    )
      return;

    const map: Record<string, boolean> = {};
    ids.forEach(id => {
      map[id] = favoritesData.data.some((fav: any) => fav._id === id);
    });

    setFavoritesMap(map);
  }, [favoritesData?.data, ids]);

  const toggleFavorite = async (id: string) => {
    if (!isLogin) return;

    try {
      if (!favoritesMap[id]) {
        console.log(`Додаємо до улюблених: id = ${id}`);
        await addToFavorites({ id, data: { role } }).unwrap();
        setFavoritesMap(prev => ({ ...prev, [id]: true }));
        console.log(`Успішно додано до улюблених: id = ${id}`);
        await refetch();
      } else {
        console.log(`Видаляємо з улюблених: id = ${id}`);
        await removeFromFavorites({ id }).unwrap();
        setFavoritesMap(prev => ({ ...prev, [id]: false }));
        console.log(`Успішно видалено з улюблених: id = ${id}`);
        await refetch();
      }
    } catch (err: any) {
      console.error('Помилка при додаванні/видаленні улюбленого:', err);
    }
  };

  return { favoritesMap, toggleFavorite };
};
