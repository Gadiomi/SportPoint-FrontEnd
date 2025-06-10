import { useTranslation } from 'react-i18next';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import Line from '@/kit/Line/Line';
import BigLoader from '@/components/BigLoader/BigLoader';
import ProfileButton from '@/components/ProfileButton/ProfileButton';
import DeleteAccountBlock from '@/components/DeleteAccountBlock/DeleteAccountBlock';
import { AccountCont, AccountName, AccountWrapper } from './styles';

const EditAdmin = () => {
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined);
  console.log('data -> ', userData);

  if (isLoading) {
    return <BigLoader isLoading={isLoading} />;
  }
  return (
    <AccountWrapper>
      <AccountName>
        <img
          src={
            userData?.userProfile?.avatar ||
            '/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
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
        <ProfileButton title={'chat'} />
        <ProfileButton title={'class-schedule'} />
        <ProfileButton title={'coaches-work-schedule'} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={'club-reviews'} />
        <ProfileButton title={'statistics'} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={''} />
        <ProfileButton title={''} />
        <ProfileButton title={''} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={''} />
        <ProfileButton title={''} />
        {/* <ProfileButton title={''} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={'favorites'} />
        <ProfileButton title={'reviews'} />
        <ProfileButton title={'online-appointment'} />
        <Line $top={'16px'} $bottom={'16px'} />
        <ProfileButton title={'general'} /> */}
        <ProfileButton title={'change-password'} />
      </AccountCont>

      <DeleteAccountBlock t={t} />
    </AccountWrapper>
  );
};

export default EditAdmin;
