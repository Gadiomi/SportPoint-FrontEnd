import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  AccountName,
  ContactInfo,
  GeneralInFormWrapper,
  GeneralSports,
  GeneralWrapper,
  SelectTitle,
  SportButton,
  SportButtonsContainer,
} from './styles';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import BackSaveButtons from './BackSaveButtons';
import BigLoader from '@/components/BigLoader/BigLoader';
// import Select from 'node_modules/react-select/dist/declarations/src/Select';
import Select, { StylesConfig } from 'react-select';

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
  const { t } = useTranslation();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  type OptionType = {
    value: string;
    label: string;
  };

  const cityOptions: OptionType[] = [
    { value: 'kyiv', label: 'Київ' },
    { value: 'odesa', label: 'Одеса' },
    { value: 'dnipro', label: 'Дніпро' },
    { value: 'lviv', label: 'Львів' },
  ];

  const customStyles: StylesConfig<OptionType, false> = {
    control: provided => ({
      ...provided,
      backgroundColor: 'transparent',
      border: '0.5px solid rgba(183, 183, 185, 1)',
      borderRadius: '6px',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      maxHeight: '37px',
      '&:hover': {
        border: '0.5px solid rgba(183, 183, 185, 1)',
      },
    }),
    valueContainer: provided => ({
      ...provided,
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '304px',
    }),
    singleValue: provided => ({
      ...provided,
      color: 'rgba(183, 183, 185, 1)',
      display: 'flex',
      alignItems: 'center',
      marginTop: '4px',
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: 'rgba(28, 27, 32, 1)',
      border: '0.5px solid rgba(183, 183, 185, 1)',
      boxShadow: 'none',
      margin: '0',
    }),
    indicatorsContainer: provided => ({
      ...provided,
      width: '37px',
      maxHeight: '37px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(183, 183, 185, 0.2)'
        : 'transparent',
      color: ' rgba(183, 183, 185, 1)',
      cursor: 'pointer',
    }),
    input: provided => ({
      ...provided,
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: 0,
      border: 'none',
      clip: 'rect(0 0 0 0)',
      overflow: 'hidden',
    }),
  };

  const [selectedCity, setSelectedCity] = useState(cityOptions[0]);

  const handleChange = (selectedOption: OptionType | any) => {
    setSelectedCity(selectedOption);
  };

  const email = localStorage.getItem('userEmail');

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

  if (isLoading) {
    // return <div>Loading...</div>;
    return <BigLoader isLoading={isLoading} />;
  }

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
      <SelectTitle>Місто</SelectTitle>
      <Select<OptionType>
        options={cityOptions}
        styles={customStyles}
        value={selectedCity}
        onChange={handleChange}
        isSearchable={false}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralInFormWrapper>
          <ContactInfo>Загальна інформація</ContactInfo>
          <Input
            testId="firstName"
            label={t(`account_page.firstName`)}
            value={watch('firstName') || ''}
            {...register('firstName')}
            onChange={e => setValue('firstName', e.target.value)}
          />
          <Input
            testId="lastName"
            label={t(`account_page.lastName`)}
            value={watch('lastName') || ''}
            {...register('lastName')}
            onChange={e => setValue('lastName', e.target.value)}
          />
          <ContactInfo>Контактна інформація</ContactInfo>
          <Input
            testId="email"
            label="Email"
            value={userData?.userProfile.description.email || ''}
            {...register('email')}
            onChange={e => setValue('email', e.target.value)}
          />
          <Input
            testId="phone"
            label={t(`account_page.phone`)}
            value={watch('description.phone') || ''}
            {...register('description.phone')}
            onChange={e => setValue('description.phone', e.target.value)}
          />
          <Input
            testId="age"
            label={t(`account_page.birth`)}
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
        <BackSaveButtons t={t} />
      </form>
    </GeneralWrapper>
  );
};
export default General;
