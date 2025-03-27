import { Container } from '@/components/ContainerAndSection';
import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import { Filters } from '../Filters/Filters';
import { StyledClubsList } from './styles';
import { Pagination } from '@/components/Pagination/Pagination';

interface Club {
  id: number;
  name: string;
  number: number;
}

interface ClubsListProps {
  items: Club[];
}
export const ClubsList: React.FC<ClubsListProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      <Filters />
      <StyledClubsList>
        {displayedItems.map(club => (
          <li key={club.id}>
            <h1>{club.number}</h1>
            <p>{club.name}</p>
          </li>
        ))}
      </StyledClubsList>
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};
