import React from 'react';
import {
  LeftButton,
  PaginationContainer,
  RightButton,
  StyledPaginate,
} from './styles';
import { Icon, IconName } from '@/kit';

interface PaginationProps {
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
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
        forcePage={Math.min(currentPage - 1, totalPages - 1)}
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
