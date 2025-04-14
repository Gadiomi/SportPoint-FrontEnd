import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { Pagination } from '@/components/Pagination/Pagination';
import { Loading, StyledButtonBack, StyledTrainersList } from './styles';
import CoachCard from '@/components/CoachCard/CoachCard';
import { FilterParams, ICoachData } from '@/types';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

export const TrainersList: React.FC = () => {
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
    role: 'coach',
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
            testId="coachsBack"
            title={t('coachs')}
            style={{ textDecoration: 'none' }}
            appearance={ButtonAppearance.UNDERLINED}
            appendChild={<Icon name={IconName.ARROW_LEFT} />}
          />

          <Filters
            getFilteredCards={getFilteredCards}
            setFilters={setFilters}
          />
          <StyledTrainersList>
            {data?.data?.data?.map((coach: ICoachData) => (
              <CoachCard key={coach._id} coachData={coach} />
            ))}
          </StyledTrainersList>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data?.data?.totalPages > 0 ? data.data.totalPages : 1}
          />
        </>
      )}
      {error ? <p>Помилка завантаження даних!</p> : null}
    </Container>
  );
};
