import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import DeleteAccountBlock from '@/components/DeleteAccountBlock/DeleteAccountBlock';
import Line from '@/kit/Line/Line';
import ProfileButton from './ProfileButton';
import { AccountCont, AccountName, AccountWrapper } from './styles';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const { data: userData } = useGetUserProfileQuery(undefined);

  return (
    <AccountWrapper>
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

      <DeleteAccountBlock t={t} />
    </AccountWrapper>
  );
};

export default AccountPage;
