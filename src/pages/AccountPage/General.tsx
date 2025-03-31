import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import css from './AccountPage.module.css';
import { useNavigate } from 'react-router-dom';

interface UserProfileFormData {
  avatar: string | File;
  firstName?: string;
  lastName: string;
  phone?: string;
  email: string;
  age?: string;
  sport?: string;
}

const General: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined);
  const [user, setUser] = useState<any>(null);

  const email = localStorage.getItem('userEmail');

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const { register, handleSubmit, setValue, watch } =
    useForm<UserProfileFormData>();

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setSelectedAvatar(URL.createObjectURL(file));
      setValue('avatar', file);
    }
  };

  useEffect(() => {
    if (userData?.userProfile) {
      Object.entries(userData.userProfile).forEach(([key, value]) => {
        if (typeof value === 'string') {
          setValue(key as keyof UserProfileFormData, value); // Тепер тип value правильний
        }
      });
    }
  }, [userData, setValue]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      console.log('User email:', storedEmail);
      setValue('email', storedEmail);
    }
  }, [setValue]);

  // const onSubmit = async (formData: UserProfileFormData) => {
  //   try {
  //     console.log('Submitting data:', formData);
  //     const response = await updateUserProfile({
  //       ...formData,
  //       role: 'customer',
  //     }).unwrap();
  //     console.log('Profile updated:', response);
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   }
  // };

  const onSubmit = async (formData: UserProfileFormData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName || '');
      formDataToSend.append('lastName', formData.lastName || '');
      formDataToSend.append('email', formData.email);
      if (formData.phone) formDataToSend.append('phone', formData.phone);
      if (formData.age) formDataToSend.append('age', formData.age);
      if (formData.sport) formDataToSend.append('sport', formData.sport);
      if (avatar) formDataToSend.append('avatar', avatar); // Додаємо файл

      const response = await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading profile...</div>;
  return (
    <div className={css.generalCont}>
      <Button
        onClick={() => navigate('/profile')}
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
            name={IconName.ARROW_LEFT}
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
      <div className={css.accountName}>
        <img
          src={
            selectedAvatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
        />
        <h3>
          {user?.firstLastName || (email ? email.split('@')[0] : 'No Name')}
        </h3>
        <Button
          onClick={() => document.getElementById('avatarInput')?.click()}
          title={t(`account_page.change-profile-photo`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="general"
          className={css.refreshBtn}
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_REFRESH}
            />
          }
        />
        <input
          type="file"
          id="avatarInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.generalForm}>
          <Input
            testId="firstName"
            label="First Name"
            value={watch('firstName') || ''}
            {...register('firstName')}
            onChange={e => setValue('firstName', e.target.value)}
          />
          <Input
            testId="lastName"
            label="Last Name"
            value={watch('lastName') || ''}
            {...register('lastName')}
            onChange={e => setValue('lastName', e.target.value)}
          />
          <Input
            testId="email"
            label="Email"
            value={watch('email') || ''}
            {...register('email')}
            onChange={e => setValue('email', e.target.value)}
          />
          <Input
            testId="phone"
            label="Phone"
            value={watch('phone') || ''}
            {...register('phone')}
            onChange={e => setValue('phone', e.target.value)}
          />
          <Input
            testId="age"
            label="Age"
            value={watch('age') || ''}
            {...register('age')}
            onChange={e => setValue('age', e.target.value)}
          />
        </div>

        <p className={css.generalTypeSp}>Вид спорту</p>
        <Input
          testId="sport"
          label="Sport"
          value={userData?.userProfile.sport || ''}
          {...register('sport')}
          onChange={e => setValue('sport', e.target.value)}
        />
        <Input
          testId="sport"
          label="Sport"
          value={userData?.userProfile.sport || ''}
          {...register('sport')}
        />

        <div className={css.generalBtns}>
          <Button
            type="button"
            title={t(`account_page.back`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="back"
            onClick={() => navigate('/profile')}
          ></Button>
          <Button
            type="submit"
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
