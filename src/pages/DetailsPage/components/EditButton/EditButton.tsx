import React from 'react';
import { Icon, IconName } from '@/kit';
import { ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './styles';

interface EditButtonProps {
  titleKey?: string;
  _id: string | undefined;
  role: string;
}

const EditButton: React.FC<EditButtonProps> = ({ _id, role }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    console.log('Кнопку натиснуто!');
    console.log('ID тренера або клубу:', _id);
    console.log('ROLE тренера або клубу:', role);
    navigate(`edit`);
  };

  return (
    <StyledButton
      testId="details_page.edit_button"
      title={t('details_page.edit_button')}
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

export default EditButton;
