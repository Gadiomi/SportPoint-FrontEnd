import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { Pagination } from '@/components/Pagination/Pagination';
import { Loading, StyledButtonBack, StyledTrainersList } from './styles';
import CoachCard from '@/components/CoachCard/CoachCard';
import { FilterParams, ICoachData } from '@/types';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';
import { ButtonAppearance, Icon, IconName } from '@/kit';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const TrainersList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      {error ? <Loading>{t('home_page.error')}</Loading> : null}
      {isLoading ? (
        <Loading>{t('home_page.loading')}...</Loading>
      ) : (
        <>
          <StyledButtonBack
            onClick={() => navigate(`/`)}
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
          {data?.data?.data.length !== 0 ? (
            <StyledTrainersList>
              {data?.data?.data?.map((coach: ICoachData) => (
                <CoachCard key={coach._id} coachData={coach} />
              ))}
            </StyledTrainersList>
          ) : (
            <Loading>Немає даних для відображення</Loading>
          )}
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data?.data?.totalPages > 0 ? data.data.totalPages : 1}
          />
        </>
      )}
    </Container>
  );
};
