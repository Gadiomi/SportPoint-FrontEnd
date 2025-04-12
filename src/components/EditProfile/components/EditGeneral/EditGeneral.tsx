import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { useUpdateUserProfileMutation } from '@/redux/user/userApi';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Selection from '../Selection/Selection';
import { UserProfile } from '@/types/userProfile';
import sports from '../../data/sports.json';
import cities from '../../data/cities.json';
import socials from '../../data/socials.json';
import {
  GeneralBtns,
  Container,
  GeneralForm,
  AvatarName,
  SelectStyled,
  SelectedContainer,
  InputsSection,
  SectionTitle,
  HiddenInput,
} from './EditGeneral.styled';
import { Label } from '../Selection/Selection.styled';
import { AccountName, NameTitle } from '../../EditProfiles.style';
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
  setSelectedWorks,
  setText,
} from '@/redux/user/editProfileSlice';
import { useGetCardsQuery } from '@/redux/cards/cardApi';

interface CardItem {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
}

const EditGeneral: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userProfile = useAppSelector(state => state.user.user);
  const isLoading = useAppSelector(state => state.user.isLoading);
  const dispatch = useAppDispatch();
  const {
    selectedSports,
    selectedSocial,
    selectedWorks,
    selectedCity,
    text,
    avatar,
    selectedAvatar,
    certificates,
  } = useAppSelector(state => state.editProfile);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const { data } = useGetCardsQuery({
    perPage: 100,
    role: 'adminClub',
  });

  let cardData:
    | { id: string; firstName: string; lastName: string; userId: string }[]
    | string[] = [];

  if (data && data.data) {
    cardData = data.data.data.map((item: CardItem) => ({
      role: item.role,
      userId: item.userId,
      id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
    }));
  }

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<UserProfile>({
      defaultValues: userProfile || {},
      shouldUnregister: false,
    });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
      dispatch(setSelectedAvatar(userProfile?.avatar || null));
      dispatch(setSelectedCity(userProfile?.description.address || null));
      dispatch(setText(userProfile?.description.short_desc || ''));
      dispatch(setSelectedSports(userProfile?.sport || []));
      dispatch(setSelectedSocial(userProfile?.description.social_links || []));
      dispatch(addCertificates([]));
      dispatch(setSelectedWorks(userProfile?.work_list || []));
    }
  }, [userProfile, reset, dispatch]);

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

  const handleWorkChange = (selectedItems: string[] | { id: string }[]) => {
    if (typeof selectedItems[0] === 'string') {
      dispatch(setSelectedWorks(selectedItems as string[]));
    } else {
      dispatch(
        setSelectedWorks(
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
      if (selectedWorks.length > 0) {
        formDataToSend.append('club', JSON.stringify(selectedWorks));
      }

      certificates.forEach(file => {
        formDataToSend.append('certificates', file);
      });

      const descriptionData = {
        address: selectedCity,
        short_desc: text,
        abilities: formData.description.abilities,
        age: formData.description.age,
        schedule: formData.description.schedule,
        equipment: formData.description.equipment,
        experience: formData.description.experience,
        price: formData.description.price,
        social_links: selectedSocial,
        phone: formData.description.phone,
        email: formData.description.email,
      };

      formDataToSend.append('description', JSON.stringify(descriptionData));

      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      const response = await updateUserProfile(formDataToSend).unwrap();
      return response;
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading ...</div>;
  if (isUpdating) return <div>Updating ...</div>;
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
          <NameTitle>
            {userProfile?.firstName && userProfile?.lastName
              ? `${userProfile.firstName} ${userProfile.lastName}`
              : userProfile?.description?.email
                ? userProfile.description.email.split('@')[0]
                : 'Імʼя відсутнє'}
          </NameTitle>
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
        <HiddenInput
          type="file"
          id="avatarInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </AccountName>
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
              value={watch('description.experience') || ''}
              {...register('description.experience')}
              onChange={e => setValue('description.experience', e.target.value)}
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
            placeholder={'Обрати'}
            labelName={'Ваші види спорту'}
            onChange={handleSelectionChange}
            userData={userProfile?.sport || []}
          />
          <Selection
            content={cardData}
            placeholder={'Обрати'}
            labelName={'Спортивні клуби, де ви працюєте'}
            onChange={handleWorkChange}
            userData={userProfile?.work_list || []}
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

        <GeneralBtns>
          <Button
            type="button"
            title={t('account_page.back')}
            appearance={ButtonAppearance.SECONDARY}
            testId="back"
            onClick={() => navigate('/profile')}
            style={{
              width: '50%',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: 16,
              color: '#B7B7B9',
            }}
          />
          <Button
            type="submit"
            title={t('account_page.save')}
            appearance={ButtonAppearance.SECONDARY}
            testId="save"
            style={{
              width: '50%',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: 16,
              color: '#B7B7B9',
            }}
            prependChild={
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                  marginRight: '8px',
                }}
                width="24"
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
