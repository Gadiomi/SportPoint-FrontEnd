import { Button, ButtonAppearance, Icon, IconName, Input, Loader } from '@/kit';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/redux/user/userApi';
import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery';
import {
  ChangePasswCont,
  FormContPassw,
  GeneralBtnsWrapper,
  ModalContent,
  ModalOverlay,
  RestoreCont,
} from './styles';
import ProfileButton from './ProfileButton';
import BackSaveButtons from './BackSaveButtons';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import { useTheme } from '@/hooks';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormData>();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    console.log(' - data -> ', data);
    try {
      const response = await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      console.log(' -- response -> ', response);
      reset();
      // setIsModalOpen(true);
      //   alert('Пароль успішно змінено!');
      //   navigate('/profile');
    } catch (err) {
      alert('Помилка зміни пароля: ');
    }
  };

  return (
    <>
      <ChangePasswCont>
        <ProfileButton title={'change-password'} arrowDirection={'left'} />
      </ChangePasswCont>
      <FormContPassw>
        <h4>{t(`account_page.change-password-h`)}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div> */}
          <Input
            testId="currentPassword"
            value={watch('currentPassword') || ''}
            label={t(`account_page.password-current`)}
            {...register('currentPassword', {
              required: 'Current password is required',
            })}
            containerStyles={{
              alignItems: 'center',
            }}
            type={isVisiblePassword ? 'text' : 'password'}
            appendChild={
              <EyeForPassword
                isVisiblePassword={isVisiblePassword}
                toggleVisibilityPassword={toggleVisibilityPassword}
              />
            }
          />
          {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          {/* </div> */}
          {/* <div> */}
          <Input
            testId="newPassword"
            value={watch('newPassword') || ''}
            label={t(`account_page.password-new`)}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            containerStyles={{
              alignItems: 'center',
            }}
            type={isVisiblePassword ? 'text' : 'password'}
            appendChild={
              <EyeForPassword
                isVisiblePassword={isVisiblePassword}
                toggleVisibilityPassword={toggleVisibilityPassword}
              />
            }
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
          {/* </div> */}
          {/* <div> */}
          <Input
            testId="confirmPassword"
            value={watch('confirmPassword') || ''}
            label={t(`account_page.password-confirm`)}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === watch('newPassword') || 'Passwords do not match',
            })}
            containerStyles={{
              alignItems: 'center',
            }}
            type={isVisiblePassword ? 'text' : 'password'}
            appendChild={
              <EyeForPassword
                isVisiblePassword={isVisiblePassword}
                toggleVisibilityPassword={toggleVisibilityPassword}
              />
            }
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          {/* </div> */}
          <RestoreCont>
            <h5>{t(`account_page.forgot`)}</h5>
            <Button
              type="button"
              title={t(`account_page.restore`)}
              appearance={ButtonAppearance.UNDERLINED}
              testId="restore"
              onClick={handleOpen}
            />
          </RestoreCont>

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
              // disabled={!isValid || isLoading}
              prependChild={
                <Icon
                  styles={{
                    color: 'currentColor',
                    fill: 'transparent',
                  }}
                  name={IconName.CHECK_CONTAINED}
                />
              }
              appendChild={
                isSubmitting || isLoading ? (
                  <Loader
                    size={'16px'}
                    stroke={'#f0f0f0'}
                    strokeWidth={'1'}
                    style={{ marginLeft: '4px' }}
                  />
                ) : null
              }
            />
          </GeneralBtnsWrapper> */}
        </form>
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <PasswordRecovery onClose={handleClose} />
            </ModalContent>
          </ModalOverlay>
        )}
      </FormContPassw>
    </>
  );
};

export default ChangePassword;
