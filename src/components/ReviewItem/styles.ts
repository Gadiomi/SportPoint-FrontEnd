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
  // font-family: Manrope;
  color: white;
  padding: 12px 16px;
  margin: 10px 0;
  border-radius: 6px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 32px;
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

// -------********ReviewStata-------------

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px 12px 24px 12px;
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  padding-left: 12px;
`;

export const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
`;

export const Bar = styled.div<{ width: number }>`
  background: ${({ theme }) => theme.color.darkGray};
  height: 8px;
  width: 176px;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.width}%;
    background: ${({ theme }) => theme.color.mainOrange};
  }
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

export const CountReviews = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.color.secWhite};
`;

export const Loading = styled.p`
  text-align: center;
  font-size: 16px;
  color: gray;
`;

export const ErrorText = styled.p`
  text-align: center;
  font-size: 16px;
  color: red;
`;
