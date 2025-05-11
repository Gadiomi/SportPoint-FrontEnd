import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useChangePasswordMutation } from '@/redux/user/userApi';
import { Button, ButtonAppearance, Input } from '@/kit';
import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery';
import {
  ChangePasswCont,
  FormContPassw,
  ModalContent,
  ModalOverlay,
  RestoreCont,
} from './styles';
import ProfileButton from './ProfileButton';
import BackSaveButtons from './BackSaveButtons';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import MessageModal from '@/components/MessageModal/MessageModal';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: FC = () => {
  const { t } = useTranslation();
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
  const [isResponseModalOpen, setIsResponseModalOpen] =
    useState<boolean>(false);
  const [backResponse, setBackResponse] = useState<string>('No message');

  const handleCloseResponseModal = () => {
    setIsResponseModalOpen(false);
  };

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
      setBackResponse(response.message);
      // setIsResponseModalOpen(true);
    } catch (error) {
      console.error('Помилка зміни пароля: ', error);
      setBackResponse('Помилка зміни пароля!');
    }
    setIsResponseModalOpen(true);
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

          <BackSaveButtons t={t} />
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
        {/* --- - --- */}
        <MessageModal
          isModalOpen={isResponseModalOpen}
          handleClose={handleCloseResponseModal}
          nextRoute={'/profile'}
        >
          <p>{backResponse}</p>
        </MessageModal>
        {/* --- / - --- */}
      </FormContPassw>
    </>
  );
};

export default ChangePassword;
