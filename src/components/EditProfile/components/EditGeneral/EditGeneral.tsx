import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { useUpdateUserProfileMutation } from '@/redux/user/userApi';
import React, { FC, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Selection from '../Selection/Selection';
import { UserProfile } from '@/types/userProfile';
import sports from '../../data/sports.json';
import cities from '../../data/cities.json';
import socials from '../../data/socials.json';
import { debounce, toNumber } from 'lodash';
import {
  Container,
  GeneralForm,
  SelectStyled,
  SelectedContainer,
  InputsSection,
  SectionTitle,
} from './EditGeneral.styled';
import { Label } from '../Selection/Selection.styled';
import SocialInput from '../SocialInput/SocialInput';
import Certificates from '../Certificates/Certificates';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import EditTextArea from '../EditTextArea/EditTextArea';
import {
  addCertificates,
  setAvatar,
  setSelectedAvatar,
  setSelectedCity,
  setSelectedSocial,
  setSelectedSports,
  setText,
} from '@/redux/user/editProfileSlice';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import SearchWork from '../SearchWork/SearchWork';
import AvatarAndName from '../AvatarAndName/AvatarAndName';
import GeneralsBtn from '../GeneralsBtn/GeneralsBtn';

const EditGeneral: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userProfile = useAppSelector(state => state.user.user);
  const isLoading = useAppSelector(state => state.user.isLoading);
  const dispatch = useAppDispatch();
  const {
    selectedSports,
    selectedSocial,
    selectedCity,
    text,
    avatar,
    selectedAvatar,
    certificates,
  } = useAppSelector(state => state.editProfile);

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<
    {
      id: string;
      firstName: string;
      lastName: string;
      address?: string;
      city?: string;
    }[]
  >([]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<UserProfile>({
      defaultValues: userProfile || {},
      shouldUnregister: false,
    });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
      dispatch(setSelectedAvatar(userProfile?.avatar || null));
      dispatch(setSelectedCity(userProfile?.description.city || null));
      dispatch(setText(userProfile?.description.short_desc || ''));
      dispatch(setSelectedSports(userProfile?.sport || []));
      dispatch(setSelectedSocial(userProfile?.description.social_links || []));
      dispatch(addCertificates([]));
    }
    if (userProfile?.club) {
      setSelectedProfile(userProfile?.club as any);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [userProfile, reset, dispatch, debouncedSearch, setSelectedProfile]);

  const { data: searchResults, isFetching } = useGetByNameQuery(
    {
      name: debouncedSearchTerm,
      role: 'adminClub',
    },
    {
      skip: !debouncedSearchTerm,
    },
  );

  const handleSelectionChange = (
    selectedItems: string[] | { id: string }[],
  ) => {
    if (typeof selectedItems[0] === 'string') {
      dispatch(setSelectedSports(selectedItems as string[]));
    } else {
      dispatch(
        setSelectedSports(
          selectedItems.map(item => (item as { id: string }).id),
        ),
      );
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(setText(value));
    setValue('description.short_desc', value, { shouldValidate: true });
  };

  const handleSocialChange = (
    selectedItems: { name: string; url: string }[],
  ) => {
    console.log(selectedItems);
    dispatch(setSelectedSocial(selectedItems));
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files);
      const newCertificates = [...certificates, ...filesArray];
      dispatch(addCertificates(newCertificates));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setAvatar(file));
      dispatch(setSelectedAvatar(URL.createObjectURL(file)));
    }
  };

  const handleSelectProfile = (profile: {
    id: string;
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
  }) => {
    setSelectedProfile(prevProfiles => {
      if (prevProfiles.some(p => p.id === profile.id)) {
        return prevProfiles;
      }
      return [...prevProfiles, profile];
    });
  };

  const onSubmit = async (formData: UserProfile) => {
    try {
      const formDataToSend = new FormData();
      if (formData.firstName) {
        formDataToSend.append('firstName', formData.firstName);
      }
      if (formData.lastName) {
        formDataToSend.append('lastName', formData.lastName);
      }
      if (selectedSports.length > 0) {
        formDataToSend.append('sport', JSON.stringify(selectedSports));
      }
      if (selectedProfile.length > 0) {
        formDataToSend.append('club', JSON.stringify(selectedProfile.flat()));
      }
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      certificates.forEach(file => {
        formDataToSend.append('certificates', file);
      });

      const descriptionData = {
        city: selectedCity ?? '',
        short_desc: text,
        abilities: formData.description.abilities,
        age: formData.description.age,
        schedule: formData.description.schedule,
        equipment: formData.description.equipment,
        experience: toNumber(formData.description.experience),
        price: formData.description.price,
        social_links: selectedSocial,
        phone: formData.description.phone,
        email: formData.description.email,
      };

      formDataToSend.append('description', JSON.stringify(descriptionData));

      const response = await updateUserProfile(formDataToSend).unwrap();
      return response;
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading ...</div>;

  return (
    <Container>
      <Button
        onClick={() => navigate('/profile')}
        title={t('account_page.general')}
        appearance={ButtonAppearance.PRIMARY}
        testId="general"
        styles={{
          width: '100%',
          padding: '8px 18px',
          justifyContent: 'start',
          gap: '8px',
        }}
        textStyle={{
          width: '100%',
          textAlign: 'start',
        }}
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
      <AvatarAndName
        selectedAvatar={selectedAvatar}
        userProfile={userProfile}
        t={t}
        handleFileChange={handleFileChange}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralForm>
          <SelectedContainer>
            <Label htmlFor="description.address">Місто</Label>
            <SelectStyled
              id="description.address"
              name="description.address"
              value={selectedCity || userProfile?.description.address}
              onChange={e => dispatch(setSelectedCity(e.target.value))}
            >
              <option value="" disabled>
                {selectedCity ||
                  userProfile?.description.address ||
                  'Оберіть місто'}
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </SelectStyled>
          </SelectedContainer>
          <InputsSection>
            <SectionTitle>Загальна інформація</SectionTitle>
            <Input
              testId="firstName"
              label="Імʼя"
              value={watch('firstName') || ''}
              {...register('firstName')}
              onChange={e => setValue('firstName', e.target.value)}
            />
            <Input
              testId="lastName"
              label="Прізвище"
              value={watch('lastName') || ''}
              {...register('lastName')}
              onChange={e => setValue('lastName', e.target.value)}
            />
            <Input
              testId="age"
              label="Вік"
              value={watch('description.age') || ''}
              {...register('description.age')}
              onChange={e => setValue('description.age', e.target.value)}
            />
            <Input
              testId="experience"
              label="Досвід"
              type="number"
              value={watch('description.experience')?.toString() || ''}
              {...register('description.experience')}
              onChange={e =>
                setValue('description.experience', e.target.valueAsNumber)
              }
            />
          </InputsSection>
          <InputsSection>
            <SectionTitle>Контактна інформація</SectionTitle>
            <Input
              testId="email"
              label="Email"
              value={watch('description.email') || ''}
              {...register('description.email')}
              onChange={e => setValue('description.email', e.target.value)}
            />
            <Input
              testId="phone"
              label="Номер телефону"
              value={watch('description.phone') || ''}
              {...register('description.phone')}
              onChange={e => setValue('description.phone', e.target.value)}
            />
          </InputsSection>
          <SocialInput
            content={socials}
            placeholder={'Обрати'}
            labelName={'Соціальні мережі'}
            onChange={handleSocialChange}
            userData={userProfile?.description.social_links || []}
          />
          <Selection
            content={sports}
            // placeholder={'Обрати'}
            labelName={'Ваші види спорту'}
            onChange={handleSelectionChange}
            userData={userProfile?.sport || []}
          />
          <SearchWork
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            isFetching={isFetching}
            searchResults={searchResults}
            setSelectedProfile={handleSelectProfile}
            selectedProfile={selectedProfile}
            title={'Спортивні клуби, де ви працюєте'}
            view={false}
          />
          <Certificates
            handleCertificatesChange={handleCertificatesChange}
            certificates={userProfile?.certificates || []}
          />
          <EditTextArea
            about={userProfile?.description.short_desc}
            handleTextChange={handleTextChange}
            text={text}
            setText={setText}
          />
        </GeneralForm>
        <GeneralsBtn t={t} />
      </form>
    </Container>
  );
};

export default EditGeneral;
