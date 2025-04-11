import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';

import { Pagination } from '@/components/Pagination/Pagination';
import { StyledTrainersList } from './styles';
import CoachCard from '@/components/CoachCard/CoachCard';
import { FilterParams, ICoachData } from '@/types';
import { useGetCardsQuery } from '@/redux/cards/cardsApi';

export const TrainersList: React.FC = () => {
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

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження даних</p>;

  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      <Filters getFilteredCards={getFilteredCards} setFilters={setFilters} />
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
    </Container>
  );
};
