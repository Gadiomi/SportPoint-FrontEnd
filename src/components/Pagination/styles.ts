import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const PaginationContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.pxs.x3,
  marginTop: theme.pxs.x9,
  marginBottom: '150px',
}));

export const LeftButton = styled.button({
  '&:disabled svg': {
    color: '#898989',
    cursor: 'not-allowed',
  },
});
export const RightButton = styled.button({
  '&:disabled svg': {
    color: '#898989',
    cursor: 'not-allowed',
  },
});

export const StyledPaginate = styled(ReactPaginate)(({ theme }) => ({
  display: 'flex',
  listStyle: 'none',
  gap: theme.pxs.x1,

  '& li': {
    display: 'inline-block',
  },

  '& a': {
    padding: `${theme.pxs.x1_5}px ${theme.pxs.x3}px`,
    borderRadius: '5px',
    cursor: 'pointer',
    color: theme.color.white,
    textDecoration: 'none',
    background: 'transparent',
    border: '1px solid transparent',
  },

  '& .active a': {
    border: `1px solid ${theme.color.white}`,
  },

  '& .disabled a': {
    color: '#898989',
    cursor: 'not-allowed',
  },
  '& .previous, & .next': {
    display: 'none',
  },
}));
