import styled, { ThemeConsumer } from 'styled-components';

export const Div = styled.div``;

export const ReviewHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  background: #ff7f00;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px 8px 8px;
  border-radius: 5px;
  margin-bottom: 32px;

  &:hover {
    background: #bd510e;
    border: 0.5px solid #bd510e;
  }
`;

export const Header = styled.div`
  display: flex;
  color: rgba(248, 247, 244, 1);
  font-size: 16px;
  line-height: 22px;
  gap: 8px;
`;
export const IconDiv = styled.button`
  width: 24px;
`;

export const ReviewCard = styled.div`
  background-color: ${props => props.theme.inputBar};
  box-shadow: 1px 1px 8px rgba(43, 54, 149, 0.9);
  color: white;
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 6px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 10px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export const Stars = styled.div`
  width: 0 auto;
  display: flex;
  gap: 2px;
  color: transparent;
`;

export const Star = styled.div`
  width: 10px;
  height: 10px;
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

export const Feedback = styled.span`
  padding-top: 8px;
  padding-bottom: 16px;
  display: flex;
  gap: 10px;
`;

export const FeedbackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
export const StyledDate = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: ${({ theme }) => theme.color.secWhite};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

export const DeleteButton = styled.button`
  width: 130px;
  height: 36px;
  background: #ff7f00;
  color: ${({ theme }) => theme.color.mainWhite};
  border: none;
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
  width: 140px;
  color: ${({ theme }) => theme.color.mainWhite};
  font-size: 16px;
  border: 0.5px solid #ed772f;
  padding: 4px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background: #bd510e;
  }
`;

export const UserInfoEdit = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.inputBar};
  box-shadow: 1px 1px 10px rgba(43, 54, 149, 0.9);
  display: flex;
  padding: 18px 10px;
  margim-top: 16px;
  margin-bottom: 32px;
  gap: 10px;
`;

export const Badge = styled.div`
  background-color: #ed772f;
  color: white;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
`;

export const InitialsAvatar = styled.div`
  width: 88px;
  height: auto;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

// ---------*****ReviewTabsSwitcher--------
// Стилізація кнопок за допомогою styled-components
export const ButtonGroupTab = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 41px;
  background-color: ${props => (props.active ? '#ED772F' : '#303030')};
  border: 0.5px solid ${({ theme }) => theme.color.inputBar};
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.mainWhite};
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7f00;
    color: white;
  }
`;

// -------********ReviewStata-------------

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding -top: 16px;
  padding-bottom:24px;
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  padding-top: 32px;
`;
export const CustomHeader = styled.h2``;

export const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
`;

export const Bar = styled.div<{ width: number }>`
  background: ${({ theme }) => theme.color.darkGray};
  height: 8px;
  width: 196px;
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
