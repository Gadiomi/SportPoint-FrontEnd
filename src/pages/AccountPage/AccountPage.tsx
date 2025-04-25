import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, IconName, ButtonAppearance } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container, Section } from '@/components/ContainerAndSection';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import { useLoginMutation, useRegisterMutation } from '@/redux/auth';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { useDeleteAccountMutation } from '@/redux/auth/authApi';
import { Line } from '../RegisterPage/styles';
import ProfileButton from './ProfileButton';
import { AccountCont, AccountDeleteCont, AccountName } from './styles';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <Line margin={'16px 0'} />
        <ProfileButton title={'edit'} />
        <ProfileButton title={'change-password'} />
      </AccountCont>

      <AccountDeleteCont>
        <h4>{t(`account_page.zone`)}</h4>
        <Button
          title={t(`account_page.delete`)}
          appearance={ButtonAppearance.UNDERLINED}
          testId="delete"
          onClick={() => deleteHandler()}
        ></Button>
      </AccountDeleteCont>
    </div>
  );
};

export default AccountPage;
