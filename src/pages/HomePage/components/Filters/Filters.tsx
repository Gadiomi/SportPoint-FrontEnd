import React, { useEffect, useState } from 'react';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { StyledButton } from '@/pages/HomePage/components/Filters/styles';
import { FilterParams } from '@/types';
import { useTranslation } from 'react-i18next';

const OPENCAGE_API_KEY = 'bd9d1adf28ce421197b953651b8297e2'; // <-- встав свій ключ

interface FiltersProps {
  getFilteredCards: (filters: FilterParams) => void;
  setFilters: (filters: FilterParams) => void;
}
export const Filters: React.FC<FiltersProps> = ({
  setFilters,
  getFilteredCards,
}) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { t } = useTranslation();
  const handleOpenModal = () => {
    setIsFiltersModalOpen(true);
  };

  const getCurrentPositionAsync = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокація не підтримується вашим браузером'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const position = await getCurrentPositionAsync(); // одразу запит
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}&language=uk&no_annotations=1`,
        );

        if (!response.ok) {
          throw new Error(`HTTP помилка: ${response.status}`);
        }

        const data = await response.json();
        const components = data.results[0]?.components;
        const cityName =
          components?.city ||
          components?.town ||
          components?.village ||
          components?.county ||
          'Місто не визначено';

        setCity(cityName);
      } catch (err: any) {
        if (err.code === 1) {
          setError(
            'Доступ до геолокації заборонено. Дозвольте його у налаштуваннях браузера.',
          );
        } else {
          setError(err.message || 'Помилка при отриманні геолокації');
        }
      }
    };

    fetchCity();
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : city ? (
        <p>Ваше місто: {city}</p>
      ) : (
        <p>Визначення міста...</p>
      )}

      <StyledButton
        onClick={handleOpenModal}
        testId="filter-button"
        title={t('home_page.filters')}
        style={{ textDecoration: 'none' }}
        appearance={ButtonAppearance.UNDERLINED}
        appendChild={<Icon name={IconName.FILTERS} />}
      />

      <FiltersModal
        isFiltersModalOpen={isFiltersModalOpen}
        setIsFiltersModalOpen={setIsFiltersModalOpen}
        getFilteredCards={getFilteredCards}
        setFilters={setFilters}
      />
    </>
  );
};
