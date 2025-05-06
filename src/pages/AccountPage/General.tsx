import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/redux/auth/authApi';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import {
  AccountName,
  GeneralBtnsWrapper,
  GeneralInFormWrapper,
  GeneralSports,
  GeneralWrapper,
  SportButton,
  SportButtonsContainer,
} from './styles';
import ProfileButton from './ProfileButton';
import BackSaveButtons from './BackSaveButtons';

interface UserProfileFormData {
  avatar: string | File;
  firstName?: string;
  lastName: string;
  email: string;
  sport: string[];
  description: {
    phone?: string;
    age?: string;
  };
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
      defaultValues: {
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        sport: [],
        description: { phone: '', age: '' },
        ...userData?.userProfile,
      },
      shouldUnregister: false,
    });

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    userData?.userProfile?.avatar || null,
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  useEffect(() => {
    const storedSports = localStorage.getItem('selectedSports');
    console.log('Stored sports from localStorage:', storedSports);
    if (storedSports) {
      setSelectedSports(JSON.parse(storedSports));
    }
  }, []);

  useEffect(() => {
    if (userData?.userProfile) {
      reset({
        avatar: userData.userProfile.avatar || '',
        firstName: userData.userProfile.firstName || '',
        lastName: userData.userProfile.lastName || '',
        email: userData.userProfile.email || '',
        sport: userData.userProfile.sport || [],
        description: userData.userProfile.description || { phone: '', age: '' },
      });
      setSelectedAvatar(userData.userProfile.avatar || null);
      localStorage.setItem('userProfile', JSON.stringify(userData.userProfile));
    }
  }, [userData, reset]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setValue('email', storedEmail);
    }
  }, [setValue]);

  // useEffect(() => {
  //   setValue('sport', selectedSports);
  // }, [selectedSports, setValue]);

  const handleSportToggle = (sport: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedSports(prevState => {
      let updatedSports: string[];

      if (prevState.includes(sport)) {
        updatedSports = prevState.filter(item => item !== sport);
      } else {
        updatedSports = [...prevState, sport];
      }

      // Оновлюємо selectedSports в localStorage
      localStorage.setItem('selectedSports', JSON.stringify(updatedSports));
      return updatedSports;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setSelectedAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData: UserProfileFormData) => {
    try {
      const selectedSports = JSON.parse(
        localStorage.getItem('selectedSports') || '[]',
      );
      console.log('Selected sports before sending to server:', selectedSports);
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName ?? '');
      formDataToSend.append('lastName', formData.lastName ?? '');
      formDataToSend.append(
        'description',
        JSON.stringify({
          phone: formData.description?.phone ?? '',
          age: formData.description?.age ?? '',
        }),
      );
      formDataToSend.append('email', formData.email ?? '');
      formDataToSend.append('sport', JSON.stringify(selectedSports));

      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      const response = await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated:', response.updatedProfile);
      // localStorage.setItem('selectedSports', JSON.stringify(selectedSports));
      // localStorage.setItem('userProfile', JSON.stringify(formData));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const allSports = ['Стреччинг', 'TRX', 'Кросфіт', 'Фітнес', 'Йога', 'Кардіо'];

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <GeneralWrapper>
      <ProfileButton title={'general'} arrowDirection={'left'} />

      <AccountName $paddingTop={'45px'}>
        <img
          src={
            selectedAvatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
        />
        <h3>
          {userData?.userProfile.firstName ||
            (userData?.userProfile.description.email
              ? userData?.userProfile.description.email.split('@')[0]
              : 'No Name')}
        </h3>
        <Button
          onClick={() => document.getElementById('avatarInput')?.click()}
          title={t(`account_page.change-profile-photo`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="general"
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
      </AccountName>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralInFormWrapper>
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
            value={userData?.userProfile.description.email || ''}
            {...register('email')}
            onChange={e => setValue('email', e.target.value)}
          />
          <Input
            testId="phone"
            label="Phone"
            value={watch('description.phone') || ''}
            {...register('description.phone')}
            onChange={e => setValue('description.phone', e.target.value)}
          />
          <Input
            testId="age"
            label="Age"
            value={watch('description.age') || ''}
            {...register('description.age')}
            onChange={e => setValue('description.age', e.target.value)}
          />
        </GeneralInFormWrapper>

        <GeneralSports>Види спорту</GeneralSports>
        <SportButtonsContainer>
          {allSports.map(sport => (
            <SportButton
              key={sport}
              $isSelected={selectedSports.includes(sport)} // Передаємо статус вибору
              onClick={e => handleSportToggle(sport, e)}
            >
              {sport}
            </SportButton>
          ))}
        </SportButtonsContainer>
        <BackSaveButtons />
        {/* <GeneralBtnsWrapper>
          <Button
            type="button"
            title={t(`account_page.back`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="back"
            onClick={() => navigate('/profile')}
          />
          <Button
            type="submit"
            title={t(`account_page.save`)}
            appearance={ButtonAppearance.SECONDARY}
            testId="save"
            prependChild={
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                }}
                name={IconName.CHECK_CONTAINED}
              />
            }
          />
        </GeneralBtnsWrapper> */}
      </form>
      {/* <Button
        type="button"
        title={t(`account_page.logout`)}
        appearance={ButtonAppearance.SECONDARY}
        testId="logout"
        onClick={handleLogout}
      ></Button> */}
    </GeneralWrapper>
  );
};
export default General;
