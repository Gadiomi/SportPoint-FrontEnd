import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  styles?: React.CSSProperties;
}
interface SectionProps {
  children: React.ReactNode;
  padding?: string;
  styles?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth,
  styles,
}) => {
  return (
    <StyledContainer style={styles} maxWidth={maxWidth}>
      {children}
    </StyledContainer>
  );
};
export const Section: React.FC<SectionProps> = ({
  children,
  padding,
  styles,
}) => {
  return (
    <StyledSection style={styles} padding={padding}>
      {children}
    </StyledSection>
  );
};

const StyledContainer = styled.div<{ maxWidth?: string }>(
  ({ theme, maxWidth }) => {
    const defaultWidths = { base: '375px', md: '768px', lg: '1024px' };
    return {
      width: '100%',
      maxWidth: maxWidth || defaultWidths.base,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.color.white,
      [theme.mediaRules.up(theme.breakpoints.tablet)]: {
        maxWidth: maxWidth || defaultWidths.md,
      },
      [theme.mediaRules.up(theme.breakpoints.desktop)]: {
        maxWidth: maxWidth || defaultWidths.lg,
      },
    };
  },
);

const StyledSection = styled.div<{ padding?: string }>(
  ({ theme, padding }) => ({
    width: '100vw',
    margin: '0 auto',
    padding: padding || `${theme.pxs.x0}px ${theme.pxs.x3}px`,
    background: theme.color.background,
    color: theme.color.white,
    [theme.mediaRules.up(theme.breakpoints.tablet)]: {
      padding: padding || theme.pxs.x4,
    },
    [theme.mediaRules.up(theme.breakpoints.desktop)]: {
      padding: padding || theme.pxs.x6,
    },
  }),
);
