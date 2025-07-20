import styled from 'styled-components';

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 110px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.color.inputBar};
  border-bottom: 1px solid ${({ theme }) => theme.color.mainBlue};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Name = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
`;
export const MessagesList = styled.div(({ theme }) => ({
  flex: '1',
  padding: `${theme.pxs.x8}px ${theme.pxs.x4}px ${theme.pxs.x6}px ${theme.pxs.x4}px`,
  overflowY: 'auto',
}));
export const MessageItemBox = styled.div<{ $own: boolean }>(
  ({ theme, $own }) => ({
    maxWidth: '100%',
    display: 'flex',
    justifyContent: $own ? 'flex-end' : 'flex-start',
  }),
);
export const MessageItem = styled.div<{ $own: boolean }>(({ theme, $own }) => ({
  maxWidth: '70%',
  marginBottom: theme.pxs.x4,
  alignSelf: $own ? 'flex-end' : 'flex-start',
  background: $own ? theme.color.pressButton : theme.color.white,
  color: $own ? theme.color.white : theme.color.black,
  padding: theme.pxs.x2,
  borderRadius: $own
    ? `${theme.pxs.x4}px ${theme.pxs.x4}px ${theme.pxs.x0}px ${theme.pxs.x4}px`
    : `${theme.pxs.x4}px ${theme.pxs.x4}px ${theme.pxs.x4}px ${theme.pxs.x0}px`,
}));

export const InputWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  padding: `${theme.pxs.x3}px ${theme.pxs.x4}px`,
  paddingBottom: theme.pxs.x3_5,
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '50px',
  zIndex: '100',
  background: theme.color.inputBar,
  maxWidth: '375px',
  margin: '0 auto',
}));
export const StyledInput = styled.input(({ theme }) => ({
  flex: '1',
  border: `0.40px solid #4b4b4d`,
  padding: `${theme.pxs.x1_5}px ${theme.pxs.x3}px`,
  borderRadius: ' 50px',
  background: '#000',
  color: theme.color.white,

  '&:focus': {
    outline: 'none',
  },
}));

export const FileInputWrapper = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HiddenInput = styled.input`
  display: none;
`;
export const ImagePreview = styled.div`
  padding: 8px 16px;
  img {
    max-width: 150px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
`;

export const SendButton = styled.button`
  border: none;
  color: white;
  cursor: pointer;
`;
