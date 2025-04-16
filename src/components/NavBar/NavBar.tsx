import { Descr, Nav, NavItem, NavList, StyledNavLink } from './styles';
import { useTheme } from 'styled-components';
import { Icon, IconName } from '@/kit';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Section } from '../ContainerAndSection';

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

  return (
    <Nav>
      <Section>
        <Container>
          <NavList>
            {navItems.map(({ to, icon, descr }) => {
              const isActive = location.pathname === to;

              return (
                <NavItem key={to}>
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
                </NavItem>
              );
            })}
          </NavList>
        </Container>
      </Section>
    </Nav>
  );
};

export default NavBar;
