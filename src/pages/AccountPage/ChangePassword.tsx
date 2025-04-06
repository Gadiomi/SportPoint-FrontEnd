import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import css from './AccountPage.module.css';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/redux/user/userApi';
import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery';
import { ModalContent, ModalOverlay } from './styles';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  // const handleClose = () => {
  //   setModalOpen(false);
  // };

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      alert('Пароль успішно змінено!');
      navigate('/profile');
    } catch (err) {
      alert('Помилка зміни пароля: ');
    }
  };

  return (
    <>
      <div className={css.changePasswCont}>
        <Button
          onClick={() => navigate('/profile')}
          title={t(`account_page.change-password`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="change-password"
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
              name={IconName.ID}
            />
          }
        />
      </div>
      <div className={css.formContPassw}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>{t(`account_page.change-password-h`)}</h4>
          <div>
            <Input
              testId="password"
              value={watch('currentPassword') || ''}
              label={t(`account_page.password-current`)}
              type="password"
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          </div>

          <div>
            <Input
              testId="password"
              value={watch('newPassword') || ''}
              label={t(`account_page.password-new`)}
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>

          <div>
            <Input
              testId="password"
              value={watch('confirmPassword') || ''}
              label={t(`account_page.password-confirm`)}
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === watch('newPassword') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <div className={css.restoreCont}>
            <h5>{t(`account_page.forgot`)}</h5>
            <Button
              type="button"
              title={t(`account_page.restore`)}
              appearance={ButtonAppearance.UNDERLINED}
              testId="restore"
              onClick={handleOpen}
            ></Button>
          </div>
          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <PasswordRecovery />
              </ModalContent>
            </ModalOverlay>
          )}
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
      </div>
    </>
  );
};

export default ChangePassword;
