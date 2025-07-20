import React from 'react';
import { Icon, IconName } from '@/kit'; //
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Title } from '@/kit/Typography/Typography';
import { IconContainer } from './styles';

interface IconWithTitleProps {
  iconName?: IconName;
  titleKey: string;
  iconSize?: string;
}

const TitleContainer: React.FC<IconWithTitleProps> = ({ titleKey }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <IconContainer>
      <Icon
        name={IconName.ARROW_RIGHT}
        styles={{
          color: theme.color.mainOrange,
          width: '32px',
          height: '32px',
        }}
      />
      <Title>{t(titleKey)}</Title>
    </IconContainer>
  );
};

export default TitleContainer;
