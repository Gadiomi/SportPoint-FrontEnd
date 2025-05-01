import { Descr, Nav, NavBox, NavItem, NavList, StyledNavLink } from './styles';
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
    { to: '/trainers', icon: IconName.TRAINER, descr: t('coachs') },
    { to: '/clubs', icon: IconName.CLUB, descr: t('clubs-list') },
    {
      to: '/profile',
      icon: IconName.ACCOUNT,
      descr: t('profile'),
    },
    { to: '/search', icon: IconName.SEARCH, descr: t('nav_bar.search') },
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
                    <button
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
                    </button>
                  ) : (
                    <StyledNavLink to={to}>
                      <Icon
                        name={icon}
                        size={24}
                        styles={{
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
          type={t('nav_bar.modalFav')}
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
