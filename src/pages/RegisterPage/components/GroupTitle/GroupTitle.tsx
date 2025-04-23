import { FC } from 'react';
import { useTheme } from 'styled-components';
import { Icon, IconName } from '@/kit';
import { BlockWrapper } from './styles';
import { IGroupTitleProps } from '../types';

const GroupTitle: FC<IGroupTitleProps> = ({ handler, isOpen, title }) => {
  const theme = useTheme();
  return (
    <BlockWrapper onClick={handler}>
      <p>{title}</p>
      <Icon
        styles={{
          color: 'currentColor',
          transition: `transform  ${theme.transitions.rotate}`,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          minWidth: '24px',
        }}
        name={IconName.DOWN_ARROW}
      />
    </BlockWrapper>
  );
};

export default GroupTitle;
