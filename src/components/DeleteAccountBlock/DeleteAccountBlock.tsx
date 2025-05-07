import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';
import { useDeleteAccountMutation } from '@/redux/auth/authApi';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { Button, ButtonAppearance, Loader } from '@/kit';
import { AccountDeleteWrapper } from './styles';

interface IT {
  t: (key: string) => string;
}

const DeleteAccountBlock: FC<IT> = ({ t }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const deleteHandler = async () => {
    try {
      const response: any = await deleteAccount('').unwrap();
      // console.log(' - response ->', response);
      dispatch(setIsLogin(false));
      Cookies.remove(CookiesKey.TOKEN, { path: '/' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN, { path: '/' });
      Cookies.remove(CookiesKey.TOKEN_F, { path: '/' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN_F, { path: '/' });
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Не вдалося видалити акаунт: ', err);
    }
  };
  return (
    <AccountDeleteWrapper>
      <h4>{t(`account_page.zone`)}</h4>
      <Button
        title={t(`account_page.delete`)}
        appearance={ButtonAppearance.UNDERLINED}
        testId="delete"
        onClick={() => deleteHandler()}
        textStyle={{ color: '#ED772F' }}
        appendChild={
          isLoading ? (
            <Loader
              size={'16px'}
              stroke={'#f0f0f0'}
              strokeWidth={'1'}
              style={{ marginLeft: '4px' }}
            />
          ) : null
        }
      ></Button>
    </AccountDeleteWrapper>
  );
};

export default DeleteAccountBlock;
