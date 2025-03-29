import { Button, ButtonAppearance, Input } from '@/kit';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import css from './AccountPage.module.css';

interface UserProfileFormData {
  firstLastName?: string;
  phone?: string;
  email: string;
  address?: string;
  age?: string;
  sport?: string;
}

const General: FC = () => {
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined);
  const [user, setUser] = useState<any>(null);

  const email = localStorage.getItem('userEmail');
  console.log('User email:', email);
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const { register, handleSubmit, setValue } = useForm<UserProfileFormData>();

  useEffect(() => {
    if (userData?.userProfile) {
      Object.entries(userData.userProfile).forEach(([key, value]) => {
        if (typeof value === 'string') {
          setValue(key as keyof UserProfileFormData, value); // Тепер тип value правильний
        }
      });
    }
  }, [userData, setValue]);

  const onSubmit = async (formData: UserProfileFormData) => {
    try {
      const response = await updateUserProfile(formData).unwrap();
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading profile...</div>;
  return (
    <div className={css.generalCont}>
      <div className={css.accountName}>
        <img
          src={
            user?.avatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
        />
        <h3>
          {user?.firstLastName || (email ? email.split('@')[0] : 'No Name')}
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.generalForm}>
          <Input
            testId="firstName"
            label="First Name"
            value={userData?.userProfile.firstLastName || ''}
            {...register('firstLastName')}
          />
          <Input
            testId="lastName"
            label="Last Name"
            value={userData?.userProfile.firstLastName || ''}
            {...register('firstLastName')}
          />
          <Input
            testId="email"
            label="Email"
            value={userData?.userProfile.email || ''}
            {...register('email')}
          />
          <Input
            testId="phone"
            label="Phone"
            value={userData?.userProfile.phone || ''}
            {...register('phone')}
          />
          <Input
            testId="age"
            label="Age"
            value={userData?.userProfile.age || ''}
            {...register('age')}
          />
          <Input
            testId="sport"
            label="Sport"
            value={userData?.userProfile.sport || ''}
            {...register('sport')}
          />
        </div>
        <div className={css.generalBtns}>
          <Button
            type="submit"
            title={t(`account_page.back`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="back"
          ></Button>
          <Button
            type="button"
            title={t(`account_page.save`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="save"
          ></Button>
        </div>
      </form>
    </div>
  );
};
export default General;
