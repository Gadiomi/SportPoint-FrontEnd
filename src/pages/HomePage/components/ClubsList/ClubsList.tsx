import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { StyledClubsList } from './styles';
import { Pagination } from '@/components/Pagination/Pagination';

import { ClubData, FilterParams } from '@/types';
import { ClubCard } from '@/components/ClubCard/ClubCard';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';
import { Loading, StyledButtonBack } from '../TrainersList/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { useTranslation } from 'react-i18next';

export const ClubsList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const abilityFromUrl = searchParams.get('abilities') || '';
  const [filters, setFilters] = useState<FilterParams>({
    city: '',
    minPrice: null,
    maxPrice: null,
    abilities: abilityFromUrl,
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
          {error ? <Loading>{t('home_page.error')}</Loading> : null}
          <StyledButtonBack
            onClick={() => navigate(`/`)}
            testId="clubsBack"
            title={t('clubs-list')}
            appearance={ButtonAppearance.UNDERLINED}
            appendChild={<Icon name={IconName.ARROW_LEFT} />}
          />
          <Filters
            getFilteredCards={getFilteredCards}
            setFilters={setFilters}
          />
          {data?.data?.data.length !== 0 ? (
            <StyledClubsList>
              {data?.data?.data?.map((club: ClubData) => (
                <ClubCard key={club._id} clubData={club} />
              ))}
            </StyledClubsList>
          ) : (
            <Loading>{t('home_page.noResult')}</Loading>
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
