import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
}
interface SectionProps {
  children: React.ReactNode;
  padding?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, maxWidth }) => {
  return <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>;
};
export const Section: React.FC<SectionProps> = ({ children, padding }) => {
  return <StyledSection padding={padding}>{children}</StyledSection>;
};

const StyledContainer = styled.div<{ maxWidth?: string }>(
  ({ theme, maxWidth }) => {
    return {
      width: '100%',
      maxWidth: maxWidth || theme.breakpoints.mobile,
      margin: '0 auto',
      background: theme.color.background,
      [theme.mediaRules.up(768)]: {
        maxWidth: maxWidth || theme.breakpoints.tablet,
      },
      [theme.mediaRules.up(1440)]: {
        maxWidth: maxWidth || theme.breakpoints.desktop,
      },
    };
  },
);

const StyledSection = styled.div<{ padding?: string }>(
  ({ theme, padding }) => ({
    width: '100%',
    padding: padding || theme.pxs.x2,
    [theme.mediaRules.up(768)]: {
      padding: padding || theme.pxs.x4,
    },
    [theme.mediaRules.up(1440)]: {
      padding: padding || theme.pxs.x6,
    },
  }),
);
