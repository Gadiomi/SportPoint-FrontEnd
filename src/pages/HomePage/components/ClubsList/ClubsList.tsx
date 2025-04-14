import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { StyledClubsList } from './styles';
import { Pagination } from '@/components/Pagination/Pagination';

import { ClubData, FilterParams } from '@/types';
import { ClubCard } from '@/components/ClubCard/ClubCard';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';
import { Loading, StyledButtonBack } from '../TrainersList/styles';
import { useNavigate } from 'react-router-dom';
import { ButtonAppearance, Icon, IconName } from '@/kit';

import { t } from 'i18next';

export const ClubsList: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterParams>({
    address: '',
    minPrice: null,
    maxPrice: null,
    abilities: '',
    sort: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useGetCardsQuery({
    role: 'adminClub',
    page: currentPage,
    ...filters,
  });
  const getFilteredCards = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      {isLoading ? (
        <Loading>{t('home_page.loading')}...</Loading>
      ) : (
        <>
          <StyledButtonBack
            onClick={() => navigate(-1)}
            testId="clubsBack"
            title={t('clubs-list')}
            appearance={ButtonAppearance.UNDERLINED}
            appendChild={<Icon name={IconName.ARROW_LEFT} />}
          />
          <Filters
            getFilteredCards={getFilteredCards}
            setFilters={setFilters}
          />
          <StyledClubsList>
            {data?.data?.data?.map((coach: ClubData) => (
              <ClubCard key={coach._id} clubData={coach} />
            ))}
          </StyledClubsList>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data?.data?.totalPages > 0 ? data.data.totalPages : 1}
          />
        </>
      )}
      {error ? <p>Помилка завантаження даних</p> : null}
    </Container>
  );
};
