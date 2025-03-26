import React from 'react';
import { Icon, IconName, Title } from '@/kit';
import styled, { useTheme } from 'styled-components';

interface TitleBoxProps {
  iconName?: IconName;
  title: string;
  iconColor?: string;
  iconSize?: string;
  iconStyles?: React.CSSProperties;
  boxStyle?: React.CSSProperties;
}

export function TitleBox({
  iconName,
  title,
  iconSize,
  iconStyles,
  boxStyle,
}: TitleBoxProps) {
  const theme = useTheme();

  return (
    <StyledTitleBox style={boxStyle}>
      <Icon
        name={iconName || IconName.ARROW_RIGHT}
        size={iconSize || theme.pxs.x8}
        styles={iconStyles}
      />
      <Title>{title}</Title>
    </StyledTitleBox>
  );
}
const StyledTitleBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.pxs.x2,
}));
