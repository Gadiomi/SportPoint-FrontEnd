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
import { useLogoutMutation } from '@/redux/auth/authApi';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';

interface UserProfileFormData {
  avatar: string | File;
  firstLastName?: string;
  lastName: string;
  phone?: string;
  email: string;
  age?: string;
  sport?: string;
}

const General: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [logout] = useLogoutMutation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const email = localStorage.getItem('userEmail');
  // console.log('email:', email);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<UserProfileFormData>({
      defaultValues: userData?.userProfile || {}, // Використовуємо дані з бекенду
      shouldUnregister: false, // Не видаляємо значення після розмонтування
    });

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    userData?.userProfile?.avatar || null,
  );
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (userData?.userProfile) {
      reset(userData.userProfile);
      setSelectedAvatar(userData.userProfile.avatar || null);
      localStorage.setItem('userProfile', JSON.stringify(userData.userProfile));
    }
  }, [userData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setSelectedAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData: UserProfileFormData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstLastName', formData.firstLastName || '');
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('age', formData.age || '');
      formDataToSend.append('sport', formData.sport || '');

      if (avatar) {
        formDataToSend.append('avatar', avatar); // Додаємо файл аватара
      }

      const response = await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // const handleLogout = () => {
  //   // Видалити токени з куків
  //   Cookies.remove(CookiesKey.TOKEN);
  //   Cookies.remove(CookiesKey.REFRESH_TOKEN);

  //   // Видалити email з локального сховища
  //   localStorage.removeItem('userEmail');

  //   // Перенаправити на сторінку логіну
  //   navigate('/login');
  // };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      console.log('User email:', storedEmail);
      setValue('email', storedEmail);
    }
  }, [setValue]);

  // const onSubmit = async (formData: UserProfileFormData) => {
  //   try {
  //     const updatedData = {
  //       ...formData,
  //       avatar: avatar ? URL.createObjectURL(avatar) : selectedAvatar,
  //     };

  //     const response = await updateUserProfile(updatedData).unwrap();
  //     console.log('Profile updated:', response);
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   }
  // };

  // useEffect(() => {
  //   const storedProfile = localStorage.getItem('userProfile');
  //   if (storedProfile) {
  //     const parsedProfile = JSON.parse(storedProfile);
  //     reset(parsedProfile); // Оновлення всіх полів одночасно
  //   }
  // }, [reset]);

  if (isLoading) return <div>Loading profile...</div>;
  return (
    <div className={css.generalCont}>
      <Button
        onClick={() => navigate('/profile')}
        title={t(`account_page.general`)}
        appearance={ButtonAppearance.PRIMARY}
        testId="general"
        className={css.generalToAccBtn}
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
          {userData?.userProfile.firstLastName ||
            (userData?.userProfile.description.email
              ? userData?.userProfile.description.email.split('@')[0]
              : 'No Name')}
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
            value={watch('firstLastName') || ''}
            {...register('firstLastName')}
            onChange={e => setValue('firstLastName', e.target.value)}
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
            value={userData?.userProfile.description.email || ''}
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
            className={css.generalBtnBack}
          ></Button>
          <Button
            type="submit"
            title={t(`account_page.save`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="save"
            className={css.generalBtnSave}
            prependChild={
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                }}
                name={IconName.CHECK_CONTAINED}
              />
            }
          ></Button>
        </div>
      </form>
      {/* <Button
        type="button"
        title={t(`account_page.logout`)}
        appearance={ButtonAppearance.SECONDARY}
        testId="logout"
        onClick={handleLogout}
      ></Button> */}
    </div>
  );
};
export default General;
