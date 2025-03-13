import React from 'react';
import styled from 'styled-components';

interface ProgressBarProp {
  step: number;
  totalSteps: number;
  containerStyles?: React.CSSProperties;
  progressBarStyles?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProp> = ({
  step,
  totalSteps,
  containerStyles,
  progressBarStyles,
}) => {
  const progress = (step / totalSteps) * 100;

  return (
    <ProgressBarContainer style={containerStyles}>
      <StyledProgressBar
        style={{
          width: `${progress}%`,
          ...progressBarStyles,
        }}
      ></StyledProgressBar>
    </ProgressBarContainer>
  );
};
const ProgressBarContainer = styled.div(({ theme }) => ({
  marginTop: '40px',
  background: theme.color.background,
  height: theme.pxs.x1,
  borderRadius: '3px',
  overflow: 'hidden',
  width: theme.breakpoints.mobile,
  [theme.mediaRules.up(768)]: {
    width: theme.breakpoints.tablet,
  },
  [theme.mediaRules.up(1440)]: {
    width: theme.breakpoints.desktop,
  },
}));
const StyledProgressBar = styled.div(({ theme }) => ({
  height: '100%',
  transition: `width ${theme.transitions.base}`,
  background: theme.color.mainBlue,
  borderRadius: theme.pxs.x1,
  overflow: 'hidden',
}));
