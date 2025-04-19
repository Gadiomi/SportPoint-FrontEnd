import { Descr, Nav, NavBox, NavItem, NavList, StyledNavLink } from './styles';
import { useTheme } from 'styled-components';
import { Icon, IconName } from '@/kit';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu/MobileMenu';
import SearchModal from './SearchModal/SearchModal';

const NavBar = () => {
  const theme = useTheme();
  const location = useLocation();

  const navItems = [
    { to: '/trainers', icon: IconName.TRAINER, descr: 'Тренери' },
    { to: '/clubs', icon: IconName.CLUB, descr: 'Спортклуби' },
    { to: '/profile', icon: IconName.ACCOUNT, descr: 'Профіль' },
    { to: '/search', icon: IconName.SEARCH, descr: 'Пошук' },
    { to: '/menu', icon: IconName.MENU, descr: 'Меню' },
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

  const toggleSearch = () => {
    setIsOpen(false);
    setIsSearchOpen(prev => !prev);
  };

  const closeMenu = () => setIsOpen(false);
  const closeSearch = () => setIsSearchOpen(false);
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
                icon === IconName.MENU || icon === IconName.SEARCH;
              const isHighlighted =
                (icon === IconName.MENU && isOpen) ||
                (icon === IconName.SEARCH && isSearchOpen);

              return (
                <NavItem key={to}>
                  {isButton ? (
                    <button
                      onClick={
                        icon === IconName.SEARCH ? toggleSearch : toggleMenu
                      }
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
    </>
  );
};

export default NavBar;
