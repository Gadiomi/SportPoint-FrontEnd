import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';

import { Pagination } from '@/components/Pagination/Pagination';
import { StyledTrainersList } from './styles';
import CoachCard from '@/components/CoachCard/CoachCard';
import { ICoachData } from '@/types';
import { useGetCoachCardsQuery } from '@/redux/cards/cardsApi';

export const TrainersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  console.log('Current Page:', currentPage);
  const { data, error, isLoading } = useGetCoachCardsQuery({
    page: currentPage,
    perPage: itemsPerPage,
  });
  console.log('Запит на сервер з параметрами:', {
    page: currentPage,
    perPage: itemsPerPage,
  });
  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження даних</p>;
  console.log('Повна відповідь сервера:', data);
  console.log('Структура даних:', data?.data);
  console.log('Total pages з сервера:', data?.data?.totalPages);
  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      <Filters />
      <StyledTrainersList>
        {data?.data?.data?.map((coach: ICoachData) => (
          <CoachCard key={coach.userId || coach._id} coachData={coach} />
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
