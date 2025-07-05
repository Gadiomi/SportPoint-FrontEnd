import React from 'react';
import { Icon, IconName } from '@/kit';
import { ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './styles';

interface ButtonReserveProps {
  titleKey?: string;
  _id: string | undefined;
  role: string;
}

const ButtonReserve: React.FC<ButtonReserveProps> = ({ _id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  console.log('ID', _id);

  const handleClick = () => {
    console.log('Кнопку натиснуто!');
    navigate(``);
  };

  return (
    <StyledButton
      testId="details_page.reserve_button"
      title={t('details_page.reserve_button')}
      appearance={ButtonAppearance.PRIMARY}
      onClick={handleClick}
      textStyle={{ ...fonts.mainTitle, color: theme.color.white }}
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

export default ButtonReserve;
