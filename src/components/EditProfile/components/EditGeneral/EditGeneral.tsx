import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Selection from '../Selection/Selection';
import { UserProfile } from '@/types/userProfile';
import sports from '../../data/sports.json';
import cities from '../../data/cities.json';
import {
  GeneralBtns,
  Container,
  GeneralForm,
  AvatarName,
  SelectStyled,
  SelectedContainer,
} from './EditProfile.styled';
import { Label } from '../Selection/Selection.styled';
import { AccountName } from '../../EditProfiles.style';

const EditGeneral: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const handleSelectionChange = (selectedItems: string[]) => {
    setSelectedSports(selectedItems);
  };

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<UserProfile>({
      defaultValues: userData?.userProfile || {},
      shouldUnregister: false,
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

  const onSubmit = async (formData: UserProfile) => {
    try {
      const firstLastName = `${formData.name} ${formData.last_name}`;

      const formDataToSend = new FormData();
      formDataToSend.append('firstLastName', firstLastName);
      formDataToSend.append('lastName', formData.last_name);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('age', formData.age || '');
      formDataToSend.append('sport', JSON.stringify(selectedSports));

      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      const response = await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      console.log('User email:', storedEmail);
      setValue('email', storedEmail);
    }
  }, [setValue]);

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <Container>
      <Button
        onClick={() => navigate('/profile')}
        title={t('account_page.general')}
        appearance={ButtonAppearance.PRIMARY}
        testId="general"
        style={{ width: '100%', padding: '8px 18px' }}
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
      <AccountName>
        <AvatarName>
          <img
            src={
              selectedAvatar ||
              '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
            }
            alt=""
          />
          <h3>
            {userData?.userProfile.firstLastName ||
              (userData?.userProfile.description.email
                ? userData?.userProfile.description.email.split('@')[0]
                : 'No Name')}
          </h3>
        </AvatarName>
        <Button
          onClick={() => document.getElementById('avatarInput')?.click()}
          title={t('account_page.change-profile-photo')}
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
        <GeneralForm>
          <Input
            testId="firstName"
            label="Імʼя"
            value={watch('name') || ''}
            {...register('name')}
            onChange={e => setValue('name', e.target.value)}
          />
          <Input
            testId="lastName"
            label="Прізвище"
            value={watch('last_name') || ''}
            {...register('last_name')}
            onChange={e => setValue('last_name', e.target.value)}
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
            label="Номер телефону"
            value={watch('phone') || ''}
            {...register('phone')}
            onChange={e => setValue('phone', e.target.value)}
          />
          <Input
            testId="age"
            label="Вік"
            value={watch('age') || ''}
            {...register('age')}
            onChange={e => setValue('age', e.target.value)}
          />
          <Input
            testId="experience"
            label="Досвід"
            value={watch('experience') || ''}
            {...register('experience')}
            onChange={e => setValue('experience', e.target.value)}
          />

          <SelectedContainer>
            <Label htmlFor="city">Місто</Label>
            <SelectStyled id="city" name="city">
              <option value="">Місто</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </SelectStyled>
          </SelectedContainer>
          <Selection
            content={sports}
            placeholder={'Обрати ще'}
            labelName={'Вид спорту'}
            onChange={handleSelectionChange}
          />
        </GeneralForm>

        <GeneralBtns>
          <Button
            type="button"
            title={t('account_page.back')}
            appearance={ButtonAppearance.SECONDARY}
            testId="back"
            onClick={() => navigate('/profile')}
          />
          <Button
            type="submit"
            title={t('account_page.save')}
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
        </GeneralBtns>
      </form>
    </Container>
  );
};

export default EditGeneral;
