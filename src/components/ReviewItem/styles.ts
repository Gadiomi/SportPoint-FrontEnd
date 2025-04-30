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

// export const ReviewCard = styled.div`
//   background-color: ${({ theme }) => theme.color.inputBar};
//   box-shadow: 1px 1px 10px rgba(43, 54, 149, 0.9);
//   color: white;
//   padding: 8px;
//   margin: 16px 0;
//   border-radius: 6px;

// `;

interface ReviewCardProps {
  isEven: boolean;
}

export const ReviewCard = styled.div<ReviewCardProps>`
  background-color: ${({ theme, isEven }) =>
    isEven ? theme.color.darkGray : theme.color.inputBar};
  box-shadow: 1px 1px 10px rgba(43, 54, 149, 0.9);
  color: white;
  padding: 8px;
  margin: 16px 0;
  border-radius: 6px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 10px;
`;

export const UserInfoReply = styled.div`
  padding: 8px;
  background-color: ${({ theme }) => theme.color.inputBar};
  border-radius: 6px;
  box-shadow: 1px 1px 10px rgba(43, 54, 149, 0.9);
  margin-bottom: 32px;
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
  border-radius: 6px;
  overflow: hidden;
  padding-bottom: 32px;
`;

export const TabButton = styled.button<{
  active?: boolean;
  position: 'left' | 'right';
}>`
  padding: 8px 48px;
  border-radius: 6px;
  background-color: ${({ active, theme }) =>
    active ? theme.color.mainBlue : theme.color.inputBar};
  color: ${({ active, theme }) =>
    active ? theme.color.white : theme.color.secWhite};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${({ position }) =>
    position === 'left'
      ? 'border-top-right-radius: 0; border-bottom-right-radius: 0;'
      : 'border-top-left-radius: 0; border-bottom-left-radius: 0;'}

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.color.mainBlue : theme.color.inputBar};
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

export const SportListEdit = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 2px;
`;

export const SportTagEdit = styled.span`
  background-color: transparent;
  border: 0.5px solid ${({ theme }) => theme.color.mainBlue};
  color: ${({ theme }) => theme.color.secWhite};
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 60px;
`;

export const SportList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
`;

export const SportTag = styled.span`
  background-color: transparent;
  border: 0.5px solid ${({ theme }) => theme.color.secWhite};
  color: ${({ theme }) => theme.color.secWhite};
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 60px;
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

export const Overlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  max-width: 375px;
  height: 95%;
  background: ${({ theme }) => theme.color.background};
  border-radius: 12px;
  padding: 12px;
`;

export const ReplyContainer = styled.div`
  margin-top: 8px;
  padding: '12px';
  color: '#fff';
  backgroundcolor: transparent;
`;
