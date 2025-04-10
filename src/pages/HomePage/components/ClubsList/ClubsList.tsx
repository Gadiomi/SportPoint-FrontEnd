import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { StyledClubsList } from './styles';
import { Pagination } from '@/components/Pagination/Pagination';

import { ClubData, FilterParams } from '@/types';
import { ClubCard } from '@/components/ClubCard/ClubCard';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';

export const ClubsList: React.FC = () => {
  const [filters, setFilters] = useState<FilterParams>({
    address: '',
    minPrice: null,
    maxPrice: null,
    abilities: '',
    sort: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  console.log('filters:', filters);
  const { data, error, isLoading } = useGetCardsQuery({
    role: 'adminClub',
    page: currentPage,
    ...filters,
  });
  const getFilteredCards = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження даних</p>;
  console.log('data.data', data.data);
  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      <Filters getFilteredCards={getFilteredCards} setFilters={setFilters} />
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
    </Container>
  );
};
