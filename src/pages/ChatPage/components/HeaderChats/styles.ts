import { Button } from '@/kit';
import styled from 'styled-components';
interface StyledButtonProps {
  $active?: boolean;
  $isActive?: boolean;
  $changeActive?: boolean;
}

export const Title = styled.p(({ theme }) => ({
  ...theme.fonts.aboutText,
}));
export const HeaderBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.pxs.x3_5}px ${theme.pxs.x0}px`,
  marginBottom: theme.pxs.x4,
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: '1300',
}));
export const BoxHeaderChats = styled.div(({ theme }) => ({
  backgroundColor: theme.color.inputBar,
}));
export const ChangeButton = styled.button<StyledButtonProps>(
  ({ theme, $changeActive }) => ({
    color: $changeActive ? theme.color.mainOrange : theme.color.disabled,
  }),
);
export const StyledButton = styled(Button)<StyledButtonProps>(
  ({ theme, $active }) => ({
    padding: '0px',
    backgroundColor: 'transparent',
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    svg: {
      stroke: $active ? theme.color.mainOrange : theme.color.white,
      transition: 'stroke 0.3s ease',
    },
  }),
);
export const BoxButtons = styled.div(({ theme }) => ({
  marginTop: theme.pxs.x8,
  display: 'flex',
  gap: theme.pxs.x4,
}));

export const WhoButton = styled.button<StyledButtonProps>`
  ${({ theme, $isActive }) => `
    ${theme.fonts.mainButton};
    color: ${theme.color.disabled};
    
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    padding: 0px 12px;
    padding-bottom: ${$isActive ? '10px' : 'none'};
    position: relative;

   

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 10%;
    right: 5%;
    width: 80%;
      height: 4px;
      background-color: ${$isActive ? theme.color.mainOrange : 'transparent'};
      border-radius: 4px;
      transition: all 0.2s ease-in-out;
    }
  `}
`;
