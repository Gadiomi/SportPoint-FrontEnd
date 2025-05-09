import { FC, useEffect, useState } from 'react';
import {
  MenuWrapper,
  MenuContent,
  Overlay,
  MenuList,
  MenuItem,
  Descr,
  ButtonBox,
  LangButton,
  Question,
} from './styles';
import { NavBox } from '../styles';
import { Button, Icon, IconName, Modal } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(state => state.setLogin);
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openFavModal = () => {
    setIsFavModalOpen(true);
  };
  const openLangModal = () => {
    setIsLangModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFavModalOpen(false);
    setIsLangModalOpen(false);
  };

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'ua';
    i18next.changeLanguage(savedLang);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <NavBox>
        <Overlay onClick={onClose} />
        <MenuWrapper $isOpen={isOpen}>
          <MenuContent>
            <MenuList>
              <MenuItem
                onClick={() => {
                  navigate('/');
                  onClose();
                }}
              >
                <Icon name={IconName.HELP} size={24} />
                <Descr>{t('nav_bar.support')}</Descr>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/');
                  onClose();
                }}
              >
                <Icon
                  name={IconName.SMILEY_HAPPY}
                  size={24}
                  styles={{ fill: 'white' }}
                />
                <Descr>{t('nav_bar.aboutUs')}</Descr>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (isLogin) {
                    navigate('/profile/edit/favorites');
                    onClose();
                  } else {
                    openFavModal();
                  }
                }}
              >
                <Icon name={IconName.HEART_NONE} size={24} />
                <Descr>{t('nav_bar.fav')}</Descr>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  openLangModal();
                }}
              >
                <Icon
                  name={IconName.GLOBE}
                  size={24}
                  styles={{ fill: 'white' }}
                />
                <Descr>{t('nav_bar.lang')}</Descr>
              </MenuItem>
            </MenuList>
            {isLogin ? (
              <Button
                testId="exit-button"
                title={t('account_page.logout')}
                prependChild={<Icon name={IconName.LOGOUT_01} />}
                style={{
                  width: '100%',
                }}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('refreshToken');
                  dispatch(setIsLogin(false));
                  navigate('/');
                  onClose();
                }}
              />
            ) : (
              <Button
                testId="exit-button"
                title={t('login')}
                prependChild={<Icon name={IconName.LOGOUT_02} />}
                style={{
                  width: '100%',
                }}
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
              />
            )}
          </MenuContent>
        </MenuWrapper>
      </NavBox>
      {isFavModalOpen && (
        <Modal
          isOpen={isFavModalOpen}
          type={t('nav_bar.modalFav')}
          onClose={handleCloseModal}
        >
          <Question>{t('nav_bar.questLogIn')}</Question>
          <ButtonBox>
            <LangButton
              onClick={() => {
                navigate('/login');
                onClose();
              }}
            >
              {t('details_page.yes')}
            </LangButton>
            <LangButton
              onClick={() => {
                handleCloseModal();
                onClose();
              }}
            >
              {t('details_page.no')}
            </LangButton>
          </ButtonBox>
        </Modal>
      )}
      {isLangModalOpen && (
        <Modal
          isOpen={isLangModalOpen}
          type={t('nav_bar.chooseLang')}
          onClose={handleCloseModal}
        >
          <ButtonBox>
            <LangButton
              onClick={() => {
                changeLanguage('en');
                handleCloseModal();
                onClose();
              }}
            >
              EN
            </LangButton>
            <LangButton
              onClick={() => {
                changeLanguage('ua');
                handleCloseModal();
                onClose();
              }}
            >
              UA
            </LangButton>
          </ButtonBox>
        </Modal>
      )}
    </>
  );
};

export default MobileMenu;
