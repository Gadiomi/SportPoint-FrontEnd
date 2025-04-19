import styled from 'styled-components';

export const Star = styled.div`
  stroke: transparent;
  strokewidth: 0;
`;

export const Div = styled.div`
  width: 100%;
`;
//-----------------**********МОДАЛКА****************

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto; /* Прокрутка при потребі */
  z-index: 1001;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// -----------------************* page EditReviewPage *****************

export const ContainerEdit = styled.div`
  position: relative;
  padding-bottom: 20px; /* Додаємо трохи відступу перед лінією */

  &::after {
    content: '';
    display: block;
    height: 2px;
    background-color: white; /* Колір лінії */
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const RatingRow = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Label = styled.span`
  color: white;
  font-size: 14px;
`;

export const HeaderEdit = styled.div`
  display: flex;
  font-size: 18px;
  gap: 4px;
`;

export const OverallRatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`;

export const OverallTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.mainWhite};
  display: flex;
  align-items: center;
`;

export const StarsDisplay = styled.div`
  display: flex;
  width: 152px;
  margin-top: 16px;
`;
export const RatingLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const StarIcon = styled.span<{ filled?: boolean }>`
//   margin-right: 4px;
//   svg {
//     width: 20px;
//     height: 20px;
//   }
// `;

export const ReviewSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto; /* Вирівнює вправо */
  color: ${({ theme }) => theme.color.secWhite};
`;

export const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.color.white};
`;
export const ReviewCount = styled.div``;

export const RatingSection = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 0;
  p {
    margin-bottom: 8px;
  }
`;

export const Starsedit = styled.div`
  max-width: 152px;
  display: flex;
  gap: 5px;
`;

export const StarIcon = styled(Star).withConfig({
  shouldForwardProp: prop => prop !== 'filled',
})<{ $filled: boolean }>`
  cursor: pointer;
  color: ${({ $filled }) => ($filled ? '#ED772F' : '#494949')};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color.mainOrange};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 170px;
  background: ${({ theme }) => theme.color.background};
  color: white;
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: 6px;
  padding: 12px 16px;
`;

export const ButtonGroupEdit = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  color: #b7b7b9;
  padding: 5px 31px;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  gap: 8px;
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: 6px;
  padding: 7px 23.5px;
  &:hover {
    background: ${({ theme }) => theme.color.mainOrange};
    border: ${({ theme }) => theme.color.mainOrange};
  }
  &:focus {
    background: #bd510e;
  }
`;
export const ContainerButtonMore = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 32px 12px 90px 12px;
`;

export const ButtonMore = styled.button`
position: relative;
color: ${({ theme }) => theme.color.white};
text-align: right;
font-size:16px;

 &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5px; /* Відстань під текстом */
    width: 100%;
    height: 0.5px; /* Товщина лінії */
    background-color: ${({ theme }) => theme.color.white};
  }
   &:hover {
    color: ${({ theme }) => theme.color.mainOrange};

  &:hover::after {
    background-color: ${({ theme }) => theme.color.mainOrange};
`;
