import styled from 'styled-components';

export const ReviewHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  background: #ff7f00;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px 8px 8px;
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  color: rgba(248, 247, 244, 1);
  font-family:Manrope
  font-size:16px;
  Line-height:22px;
  gap:8px;
`;

export const ReviewCard = styled.div`
  background-color: ${props => props.theme.inputBar};
  box-shadow: 1px 1px 8px rgba(43, 54, 149, 0.9);
  font-family: Manrope;
  color: white;
  padding: 16px 12px;
  margin: 10px 0;
  border-radius: 10px;
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Stars = styled.div`
  margin-left: auto;
  display: flex;
  color: transparent;
`;

export const Star = styled.div`
  stroke: transparent;
  strokewidth: 0;
`;

export const Comment = styled.p`
  margin: 10px 0;
`;

export const Footer = styled.div`
  justify-content: space-between;
  font-size: 12px;
  color: ${props => props.theme.secWhite};
`;

// export const Feedback = styled.span``;
export const Feedback = styled.span`
  display: flex;
  gap: 10px;
`;

export const FeedbackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
export const Date = styled.span``;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const DeleteButton = styled.button`
  color: ${({ theme }) => theme.color.mainWhite};
  border: 0.5px solid #ed772f;
  padding: 5px 16px;
  border-radius: 6px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #bd510e;
    border: 0.5px solid #bd510e;
  }
`;

export const ActionButton = styled.button`
  background: #ff7f00;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background: #bd510e;
  }
`;

// -----------------************* page EditReviewPage

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

export const HeaderEdit = styled.h2`
  display: flex;
  font-size: 18px;
  gap: 3px;
`;

export const UserInfoEdit = styled.div`
  background: ${({ theme }) => theme.color.inputBar};
  box-shadow: 1px 1px 10px rgba(43, 54, 149, 0.9);
  display: flex;
  padding: 18px 10px;
  gap: 10px;
`;

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
  text-align: left;
  padding: 20px 0;
  p {
    margin-bottom: 8px;
  }
`;

export const Starsedit = styled.div`
  display: flex;
  gap: 5px;
`;

export const StarIcon = styled(Star)<{ filled: boolean }>`
  cursor: pointer;
  // color: ${({ filled }) => (filled ? '#ED772F' : '#494949')};
  // transition: color 0.2s;

  // &:hover {
  //   color: ${({ theme }) => theme.color.mainOrange};
  // }
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

export const CancelButton = styled.button`
  color: #b7b7b9;
  padding: 5px 31px;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
  &:focus {
    color: ${({ theme }) => theme.color.white};
  }
`;

export const SaveButton = styled.button`
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: 6px;
  padding: 7px 23.5px;
  &:hover {
     background: #bd510e;
  &:focus {
    background: #bd510e;
  }
`;

// -------********ReviewStata-------------

export const ContainerStats = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  margin-top: 16px;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  gap: 6px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

export const BarContainer = styled.div`
  background: ${({ theme }) => theme.color.darkGray};
  width: 176px;
  height: 8px;
  border-radius: 2px;
  overflow: hidden;
`;

export const Bar = styled.div<{ width: number }>`
  background: ${({ theme }) => theme.color.mainOrange};
  height: 100%;
  width: ${props => props.width}%};
`;

export const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  font-weight: bold;
`;
