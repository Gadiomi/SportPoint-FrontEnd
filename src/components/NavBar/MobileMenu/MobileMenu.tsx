import { FC } from 'react';
import {
  MenuWrapper,
  MenuContent,
  Overlay,
  MenuList,
  MenuItem,
  Descr,
} from './styles';
import { NavBox } from '../styles';
import { Button, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(state => state.setLogin);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  return (
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
              <Descr>Служба підтримки</Descr>
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
              <Descr>Про нас</Descr>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('favorites');
                onClose();
              }}
            >
              <Icon name={IconName.HEART_NONE} size={24} />
              <Descr>Обрані</Descr>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/');
                onClose();
              }}
            >
              <Icon
                name={IconName.GLOBE}
                size={24}
                styles={{ fill: 'white' }}
              />
              <Descr>Змінити мову</Descr>
            </MenuItem>
          </MenuList>
          {isLogin ? (
            <Button
              testId="exit-button"
              title="Вийти"
              prependChild={<Icon name={IconName.LOGOUT_01} />}
              style={{
                width: '100%',
              }}
              onClick={() => {
                localStorage.removeItem('token'); // ?? може Cookies.remove(CookiesKey.TOKEN, { path: '' });
                localStorage.removeItem('refreshToken');
                dispatch(setIsLogin(false));
                navigate('/');
                onClose();
              }}
            />
          ) : (
            <Button
              testId="exit-button"
              title="Увійти"
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
  );
};

export default MobileMenu;
