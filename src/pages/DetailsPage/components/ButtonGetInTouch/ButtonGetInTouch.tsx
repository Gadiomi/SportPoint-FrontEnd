import React from 'react';
import { Icon, IconName } from '@/kit';
import { ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StyledButton } from './styles';

interface ButtonGetInTouchProps {
  titleKey?: string;
  onClick: () => void;
}

const ButtonGetInTouch: React.FC<ButtonGetInTouchProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClick = () => {
    onClick();
  };

  return (
    <StyledButton
      testId="details_page.get_in_touch"
      title={t('details_page.get_in_touch')}
      appearance={ButtonAppearance.PRIMARY}
      onClick={handleClick}
      textStyle={{ ...fonts.editButton, color: theme.color.white }}
      appendChild={
        <Icon
          styles={{
            color: 'currentColor',
            fill: 'transparent',
          }}
          name={IconName.ARROW_CORNER}
        />
      }
    ></StyledButton>
  );
};

export default ButtonGetInTouch;
