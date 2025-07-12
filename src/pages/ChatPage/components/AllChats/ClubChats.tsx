import { useTheme } from 'styled-components';
import { StyledBox } from './styles';
import { User } from '../User/User';
import { Section } from '@/components/ContainerAndSection';
import { FC } from 'react';
export interface ChatProps {
  isChangeActive: boolean;
}
export const ClubChats: FC<ChatProps> = ({ isChangeActive }) => {
  const theme = useTheme();
  return (
    <Section styles={{ paddingTop: theme.pxs.x8 }}>
      <StyledBox>
        <User isChangeActive={isChangeActive} />
      </StyledBox>
    </Section>
  );
};
