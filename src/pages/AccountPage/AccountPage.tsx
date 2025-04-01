import css from './AccountPage.module.css';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, IconName, ButtonAppearance } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container, Section } from '@/components/ContainerAndSection';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import { useLoginMutation, useRegisterMutation } from '@/redux/auth';

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
  return (
    <div>
      <div className={css.accountName}>
        <img
          src={
            userData?.userProfile?.avatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
        />
        <h3>
          {userData?.userProfile?.firstLastName ||
            (userData?.userProfile.description.email
              ? userData?.userProfile.description.email.split('@')[0]
              : 'No Name')}
        </h3>
      </div>
      <div className={css.accountCont}>
        <Button
          onClick={() => navigate('/profile/general')}
          title={t(`account_page.general`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="general"
          className={css.accountBtn}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_RIGHT}
            />
          }
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ACCOUNT}
            />
          }
        />
        <Button
          onClick={() => navigate('/profile/change-password')}
          title={t(`account_page.change-password`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="change-password"
          className={css.accountBtn}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_RIGHT}
            />
          }
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ID}
            />
          }
        />
        <Button
          onClick={() => navigate('/profile/reviews')}
          title={t(`account_page.reviews`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="reviews"
          className={css.accountBtn}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_RIGHT}
            />
          }
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.MASSAGE_TYPING}
            />
          }
        />
        <Button
          onClick={() => navigate('/profile/favorites')}
          title={t(`account_page.favorites`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="favorites"
          className={css.accountBtn}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_RIGHT}
            />
          }
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.HEART_NONE}
            />
          }
        />
      </div>
      <div className={css.accountDeleteCont}>
        <h4>{t(`account_page.zone`)}</h4>
        <Button
          title={t(`account_page.delete`)}
          appearance={ButtonAppearance.UNDERLINED}
          testId="delete"
          className={css.accountDelete}
        ></Button>
      </div>
    </div>
  );
};

export default AccountPage;
