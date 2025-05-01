import React, { FC } from 'react';
import { LineDiv } from './styles';

interface LineProps {
  $bottom?: string;
  $top?: string;
  style?: React.CSSProperties;
}

const Line: FC<LineProps> = ({ $bottom, $top, style }) => {
  return <LineDiv $bottom={$bottom} $top={$top} style={style} />;
};

export default Line;
