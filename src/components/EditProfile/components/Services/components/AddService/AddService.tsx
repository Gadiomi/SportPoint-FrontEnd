import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import localizeButtons from '../../../../data/all-buttons.json';
import {
  GeneralBtns,
  HiddenInput,
} from '../../../EditGeneral/EditGeneral.styled';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setSelectedServiceImg,
  setServiceImg,
} from '@/redux/user/editProfileSlice';
import {
  AddServiceAmountContainer,
  AddServiceBackButton,
  AddServiceContainer,
  AddServiceDescContainer,
  AddServiceImg,
  AddServiceImgContainer,
  AddServiceWrapper,
} from './AddService.styled';
import GeneralsBtn from '../../../GeneralsBtn/GeneralsBtn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { usePostCoachServicesMutation } from '@/redux/coachServices/coachServicesApi';

interface ServicesProps {
  _id: string;
  name: string;
  description: string;
  amount: number;
  image: string;
}

const AddService: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { selectedServiceImg, serviceImg } = useAppSelector(
    state => state.editProfile,
  );

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ServicesProps>({
      defaultValues: {},
      shouldUnregister: false,
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(
        setServiceImg(
          file || '/assets/images/DetailsPage/Services_no_photo.png',
        ),
      );
      dispatch(setSelectedServiceImg(URL.createObjectURL(file)));
    }
  };

  const [postCoachService, { isLoading, error }] =
    usePostCoachServicesMutation();

  const onSubmit = async (formData: ServicesProps) => {
    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('amount', formData.amount.toString());

    if (serviceImg) {
      console.log(serviceImg);
      formDataToSend.append('image', serviceImg);
    }

    try {
      await postCoachService(formDataToSend).unwrap();
      reset();
      dispatch(
        setSelectedServiceImg(
          '/assets/images/DetailsPage/Services_no_photo.png',
        ),
      );

      navigate('/profile/edit/servers');
    } catch (error) {
      console.error('Error while submitting service:', error);
    }
  };

  return (
    <AddServiceContainer>
      <AddServiceBackButton>
        <Button
          onClick={() => navigate('/profile/edit/servers')}
          title={localizeButtons.titles.back}
          appearance={ButtonAppearance.UNDERLINED}
          testId="addService"
          prependChild={
            <Icon
              name={IconName.ARROW_LEFT}
              styles={{ color: 'currentColor', height: '32px', width: '32px' }}
            />
          }
          styles={{
            width: '100%',
            padding: '8px 18px',
            fontSize: '24px',
            color: '#FFFFFF',
            fontWeight: '800',
            justifyContent: 'start',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        />
      </AddServiceBackButton>
      <AddServiceImgContainer>
        <Button
          onClick={() => document.getElementById('image')?.click()}
          title={'Додати світлину'}
          appearance={ButtonAppearance.UNDERLINED}
          styles={{
            padding: '6px 16px',
            gap: '8px',
            textDecoration: 'none',
            color: '#FFFFFF',
          }}
          testId="general"
        />
        <div>
          <HiddenInput
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedServiceImg && (
            <AddServiceImg src={selectedServiceImg} alt="" />
          )}
        </div>
      </AddServiceImgContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddServiceWrapper>
          <AddServiceAmountContainer>
            <h4>Вкажіть назву послуги і її вартість</h4>
            <div>
              <Input
                testId="name"
                value={watch('name') || ''}
                label="Назва послуги"
                inputStyles={{ padding: '12px 8px', width: '100%' }}
                type="text"
                containerStyles={{ width: '50%' }}
                {...register('name')}
              />
              <Input
                testId="price"
                value={watch('amount') || ''}
                label="Ціна"
                containerStyles={{ width: '56px' }}
                inputStyles={{ padding: '12px 8px', width: '100%' }}
                type="number"
                {...register('amount')}
              />
              <select name="currency" id="currency" title="Валюта">
                <option value="грн/год"> грн/год</option>
                <option value="грн/год"> грн/зан</option>
              </select>
            </div>
          </AddServiceAmountContainer>
          <AddServiceDescContainer>
            <h4>Опис послуги</h4>
            <textarea
              title="Опис послуги"
              placeholder="Опишіть послугу..."
              {...register('description')}
            ></textarea>
          </AddServiceDescContainer>
        </AddServiceWrapper>
        <GeneralsBtn t={t} navigateTo="/profile/edit/servers" />
      </form>
    </AddServiceContainer>
  );
};

export default AddService;
