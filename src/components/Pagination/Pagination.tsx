import React from 'react';
import {
  LeftButton,
  PaginationContainer,
  RightButton,
  StyledPaginate,
} from './styles';
import { Icon, IconName } from '@/kit';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationContainer>
      <LeftButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name={IconName.ARROW_LEFT} />
      </LeftButton>

      <StyledPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={event => onPageChange(event.selected + 1)}
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="..."
        previousLabel={null}
        nextLabel={null}
        pageLinkClassName="page-link"
        renderOnZeroPageCount={null}
      />

      <RightButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name={IconName.ARROW_RIGHT} />
      </RightButton>
    </PaginationContainer>
  );
};
