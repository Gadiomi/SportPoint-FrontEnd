import React, { FC } from 'react';

import { Section } from '@/components/ContainerAndSection';
import { User } from '../User/User';
import { useTheme } from 'styled-components';
import { StyledBox } from './styles';
import StyledHr from '@/components/StyledHr/StyledHr';

export interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  isChangeActive: boolean;
}

export const AllChats: FC<ChatProps> = ({ isChangeActive }) => {
  const theme = useTheme();

  return (
    <Section styles={{ paddingTop: theme.pxs.x8 }}>
      <StyledBox>
        <User isChangeActive={isChangeActive} />
        <StyledHr
          style={{ marginTop: theme.pxs.x2, marginBottom: theme.pxs.x2 }}
        />
        <User isChangeActive={isChangeActive} />
        <StyledHr
          style={{ marginTop: theme.pxs.x2, marginBottom: theme.pxs.x2 }}
        />
        <User isChangeActive={isChangeActive} />
      </StyledBox>
    </Section>
  );
};
