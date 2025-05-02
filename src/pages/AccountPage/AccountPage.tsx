import {
  FC,
  // useEffect, useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonAppearance } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
// import { useLoginMutation, useRegisterMutation } from '@/redux/auth';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { useDeleteAccountMutation } from '@/redux/auth/authApi';
import ProfileButton from './ProfileButton';
import { AccountCont, AccountDeleteCont, AccountName } from './styles';
import Line from '@/kit/Line/Line';
import { useAppDispatch } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserProfileQuery(undefined);

  // const [login, { data: userData, isLoading, isError, error }] =
  //   useLoginMutation();
  // const [user, setUser] = useState<any>(null);

  // const email = localStorage.getItem('userEmail');
  // console.log('User email:', email);

  // useEffect(() => {
  //   if (userData) {
  //     console.log('Data after registration:', userData);
  //     setUser(userData);
  //   }
  // }, [userData]);

  // if (isLoading) return <div>Loading...</div>;
  // // if (isError)
  // //   return <div>Error: {error?.data?.message || 'Something went wrong'}</div>;

  const [deleteAccount, { isLoading: isLoadingDel }] =
    useDeleteAccountMutation();

  const deleteHandler = async () => {
    try {
      const response: any = await deleteAccount('').unwrap();
      // console.log(' - response ->', response);
      dispatch(setIsLogin(false));
      Cookies.remove(CookiesKey.TOKEN, { path: '' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN, { path: '' });
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
