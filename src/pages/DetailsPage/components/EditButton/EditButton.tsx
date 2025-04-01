import React from 'react';
import { Icon, IconName } from '@/kit';
import { ButtonAppearance, ButtonTypogr } from '@/kit';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './styles';

interface EditButtonProps {
  titleKey?: string;
  // id: string;
}

const EditButton: React.FC<EditButtonProps> = () =>
  // { id }
  {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
      console.log('Кнопку натиснуто!');
      navigate(`/account/$
      // {id}
      `);
    };

    return (
      <StyledButton
        testId="details_page.edit_button"
        title={t('details_page.edit_button')}
        appearance={ButtonAppearance.PRIMARY}
        onClick={handleClick}
        appendChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.ARROW_CORNER}
          />
        }
      >
        <ButtonTypogr>{t('details_page.edit_button')}</ButtonTypogr>

        <Icon
          name={IconName.ARROW_CORNER}
          styles={{
            position: 'absolute',
            right: '${({ theme }) => `${theme.pxs.x3}px`}',
          }}
        />
      </StyledButton>
    );
  };

export default EditButton;
