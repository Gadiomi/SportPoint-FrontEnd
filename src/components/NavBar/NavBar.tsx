import {
  Descr,
  Nav,
  NavBox,
  NavItem,
  NavList,
  StyledBtnLink,
  StyledNavLink,
} from './styles';
import { useTheme } from 'styled-components';
import { Icon, IconName, Modal } from '@/kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu/MobileMenu';
import SearchModal from './SearchModal/SearchModal';
import { useAppSelector } from '@/hooks/hooks';
import { useTranslation } from 'react-i18next';
import { ButtonBox, LangButton, Question } from './MobileMenu/styles';

const NavBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { isLogin } = useAppSelector(state => state.setLogin);

  const navItems = [
    { to: '/', icon: IconName.CLUB, descr: t('main') },
    { to: '/search', icon: IconName.SEARCH, descr: t('nav_bar.search') },

    {
      to: '/profile',
      icon: IconName.ACCOUNT,
      descr: t('profile'),
    },
    { to: '/', icon: IconName.CHAT, descr: t('chat') },
    { to: '/menu', icon: IconName.MENU, descr: t('nav_bar.menu') },
  ];

  useEffect(() => {
    closeMenu();
    closeSearch();
  }, [location.pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleMenu = () => {
    setIsSearchOpen(false);
    setIsOpen(prev => !prev);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileClick = () => {
    if (isLogin) {
      navigate('/profile');
    } else {
      openProfileModal();
    }
  };

  const toggleSearch = () => {
    setIsOpen(false);
    setIsSearchOpen(prev => !prev);
  };

  const closeMenu = () => setIsOpen(false);
  const closeSearch = () => setIsSearchOpen(false);
  const closeProfileModal = () => setIsProfileModalOpen(false);
  return (
    <>
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <NavBox>
        <Nav>
          <NavList>
            {navItems.map(({ to, icon, descr }) => {
              const isActive = location.pathname === to;
              const isButton =
                icon === IconName.MENU ||
                icon === IconName.SEARCH ||
                icon === IconName.ACCOUNT;

              const isHighlighted =
                (icon === IconName.MENU && isOpen) ||
                (icon === IconName.SEARCH && isSearchOpen) ||
                (icon === IconName.ACCOUNT &&
                  location.pathname === '/profile' &&
                  isLogin);

              return (
                <NavItem key={to}>
                  {isButton ? (
                    <StyledBtnLink
                      onClick={() => {
                        if (icon === IconName.SEARCH) toggleSearch();
                        else if (icon === IconName.MENU) toggleMenu();
                        else if (icon === IconName.ACCOUNT)
                          handleProfileClick();
                      }}
                      style={{ background: 'none', border: 'none' }}
                    >
                      <Icon
                        name={icon}
                        size={24}
                        styles={{
                          color: isHighlighted
                            ? theme.color.mainOrange
                            : theme.color.white,
                        }}
                      />
                      <Descr
                        style={{
                          color: isHighlighted
                            ? theme.color.mainOrange
                            : theme.color.white,
                        }}
                      >
                        {descr}
                      </Descr>
                    </StyledBtnLink>
                  ) : (
                    <StyledNavLink to={to}>
                      <Icon
                        name={icon}
                        size={24}
                        styles={{
                          stroke: isActive
                            ? theme.color.mainOrange
                            : theme.color.white,
                          color: isActive
                            ? theme.color.mainOrange
                            : theme.color.white,
                        }}
                      />
                      <Descr
                        style={{
                          color: isActive
                            ? theme.color.mainOrange
                            : theme.color.white,
                        }}
                      >
                        {descr}
                      </Descr>
                    </StyledNavLink>
                  )}
                </NavItem>
              );
            })}
          </NavList>
        </Nav>
      </NavBox>
      {isProfileModalOpen && (
        <Modal
          isOpen={isProfileModalOpen}
          type={t('nav_bar.modalAuth')}
          onClose={closeProfileModal}
        >
          <Question>{t('nav_bar.questLogIn')}</Question>
          <ButtonBox>
            <LangButton
              onClick={() => {
                navigate('/login');
                closeProfileModal();
              }}
            >
              {t('details_page.yes')}
            </LangButton>
            <LangButton
              onClick={() => {
                closeMenu();
                closeProfileModal();
              }}
            >
              {t('details_page.no')}
            </LangButton>
          </ButtonBox>
        </Modal>
      )}
    </>
  );
};

export default NavBar;
