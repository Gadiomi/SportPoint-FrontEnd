import React from 'react';
import { Hr } from './styled';

interface StyledHrProps {
  style?: React.CSSProperties;
}

const StyledHr: React.FC<StyledHrProps> = ({ style }) => {
  return <Hr style={style} />;
};

export default StyledHr;
