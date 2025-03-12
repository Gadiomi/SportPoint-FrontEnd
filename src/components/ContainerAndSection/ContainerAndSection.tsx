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
    const defaultWidths = {
      base: '375px',
      md: '768px',
      lg: '1024px',
    };
    return {
      width: '100%',
      maxWidth: maxWidth || defaultWidths.base,
      margin: '0 auto',
      background: theme.color.background,
      [theme.mediaRules.up(768)]: {
        maxWidth: maxWidth || defaultWidths.md,
      },
      [theme.mediaRules.up(1440)]: {
        maxWidth: maxWidth || defaultWidths.lg,
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
