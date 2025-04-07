import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';
import { Filters } from '../Filters/Filters';
import { StyledClubsList } from './styles';
import { Pagination } from '@/components/Pagination/Pagination';
import { useGetClubCardsQuery } from '@/redux/cards/cardsApi';
import { ClubData } from '@/types';
import { ClubCard } from '@/components/ClubCard/ClubCard';

export const ClubsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const { data, error, isLoading } = useGetClubCardsQuery({
    page: currentPage,
    perPage: itemsPerPage,
  });
  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження даних</p>;
  console.log('Повна відповідь сервера:', data);
  console.log('Структура даних:', data?.data);
  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      <Filters />
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
