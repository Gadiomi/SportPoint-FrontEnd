import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, ButtonAppearance } from '@/kit';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import { useDeleteAccountMutation } from '@/redux/auth/authApi';
import { setIsLogin } from '@/redux/auth/loginSlice';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import ProfileButton from './ProfileButton';
import { AccountCont, AccountDeleteCont, AccountName } from './styles';
import Line from '@/kit/Line/Line';
import { useAppDispatch } from '@/hooks/hooks';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserProfileQuery(undefined);
  const [deleteAccount, { isLoading: isLoadingDel }] =
    useDeleteAccountMutation();

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
    <div>
      <AccountName>
        <img
          src={
            userData?.userProfile?.avatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
        />
        <h3>
          {userData?.userProfile?.firstName ||
            (userData?.userProfile.description.email
              ? userData?.userProfile.description.email.split('@')[0]
              : 'No Name')}
        </h3>
      </AccountName>

      <AccountCont>
        <ProfileButton title={'favorites'} />
        <ProfileButton title={'reviews'} />
        <ProfileButton title={'online-appointment'} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={'general'} />
        <ProfileButton title={'change-password'} />
      </AccountCont>

      <AccountDeleteCont>
        <h4>{t(`account_page.zone`)}</h4>
        <Button
          title={t(`account_page.delete`)}
          appearance={ButtonAppearance.UNDERLINED}
          testId="delete"
          onClick={() => deleteHandler()}
          textStyle={{ color: '#ED772F' }}
        ></Button>
      </AccountDeleteCont>
    </div>
  );
};

export default AccountPage;
