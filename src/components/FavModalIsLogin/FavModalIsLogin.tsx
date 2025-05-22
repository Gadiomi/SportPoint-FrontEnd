import { Modal } from '@/kit';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBox, LangButton, Question } from '../NavBar/MobileMenu/styles';
import { t } from 'i18next';

interface FavModalIsLoginProps {
  isFavModalOpen: boolean;
  setIsFavModalOpen: (value: boolean) => void;
}

export const FavModalIsLogin: FC<FavModalIsLoginProps> = ({
  isFavModalOpen,
  setIsFavModalOpen,
}) => {
  const navigate = useNavigate();

  const closeFavModal = () => setIsFavModalOpen(false);

  return (
    <Modal
      isOpen={isFavModalOpen}
      type={t('nav_bar.modalFav')}
      onClose={closeFavModal}
    >
      <Question>{t('nav_bar.questLogIn')}</Question>
      <ButtonBox>
        <LangButton
          onClick={() => {
            navigate('/login');
            closeFavModal();
          }}
        >
          {t('details_page.yes')}
        </LangButton>
        <LangButton
          onClick={() => {
            closeFavModal();
          }}
        >
          {t('details_page.no')}
        </LangButton>
      </ButtonBox>
    </Modal>
  );
};
