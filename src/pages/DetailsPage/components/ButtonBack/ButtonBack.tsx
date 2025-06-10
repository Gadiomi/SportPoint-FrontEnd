import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, IconName } from '@/kit';
import { Title } from '@/kit/Typography/Typography';
import { ButtonBackStyle } from './styles';

interface ButtonBackProps {
  t: (key: string) => string;
}

const ButtonBack: FC<ButtonBackProps> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <ButtonBackStyle onClick={() => navigate(-1)}>
      <Icon
        styles={{
          width: '32px',
          height: '32px',
        }}
        name={IconName.ARROW_LEFT}
      />
      <Title>{t('details_page.back_button')}</Title>
    </ButtonBackStyle>
  );
};

export default ButtonBack;
