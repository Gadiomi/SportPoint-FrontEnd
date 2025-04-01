import React from 'react';
import { Icon, IconName } from '@/kit'; //
import { useTranslation } from 'react-i18next';
import { Title } from '@/kit/Typography/Typography';
import { IconContainer } from './styles';

interface IconWithTitleProps {
  iconName?: IconName;
  titleKey: string;
  iconSize?: string;
}

const TitleContainer: React.FC<IconWithTitleProps> = ({ titleKey }) => {
  const { t } = useTranslation();

  return (
    <IconContainer>
      <Icon
        name={IconName.ARROW_RIGHT}
        styles={{
          width: '32px',
          height: '32px',
        }}
      />
      <Title>{t(titleKey)}</Title>
    </IconContainer>
  );
};

export default TitleContainer;
