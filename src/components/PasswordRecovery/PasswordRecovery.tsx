import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Icon, IconName, Input } from '@/kit';
import {
  useSendRecoveryCodeMutation,
  useVerifyCodeMutation,
} from '@/redux/password/passwordApi';
import { Container, Section } from '@/components/ContainerAndSection';
import { FontFamily } from '@/kit';
import { BackWrapper, FirstWrapper } from './styles';

interface RestoreModalProps {
  onClose: () => void;
}

const PasswordRecovery: FC<RestoreModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const [searchParams] = useSearchParams();
  const codeFromUrl = searchParams.get('code');

  const [sendRecoveryCode, { isLoading: sendingCode }] =
    useSendRecoveryCodeMutation();
  const [verifyCode, { isLoading: verifyingCode }] = useVerifyCodeMutation();

  useEffect(() => {
    if (codeFromUrl) {
      setStep(3);
    }
  }, [codeFromUrl]);

  const handleSendCode = async () => {
    try {
      await sendRecoveryCode(email).unwrap();
      alert('Перевірте пошту для відновлення паролю!');
    } catch (error) {
      console.error('Failed to send recovery code:', error);
    }
  };

  const handleSubmitNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }

    try {
      await verifyCode({
        password: newPassword,
        code: Number(codeFromUrl),
      }).unwrap();
      alert('Пароль успішно змінено!');
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
  };

  return (
    <Section
      styles={{
        fontFamily: `${FontFamily}`,
        minHeight: '100vh',
        paddingTop: '12px',
      }}
    >
      <BackWrapper>
        <Icon
          styles={{
            color: 'currentColor',
            fill: 'transparent',
          }}
          name={IconName.ARROW_LEFT}
        />
        <button onClick={onClose}>Повернутись назад</button>
      </BackWrapper>
      {step === 1 && (
        <FirstWrapper>
          <h2>Відновлення паролю</h2>
          <p>Введіть електронну пошту для відновлення акаунта</p>
          <Input
            testId="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* <button onClick={handleSendCode} disabled={sendingCode}>
            Надіслати код
          </button> */}
          <Button
            testId="register_page.submit_button"
            // title={t('register_page.submit_button')}
            title={'Надіслати код'}
            // type="submit"
            style={{ width: '100%' }}
            // disabled={!isValid || isLoading}
            disabled={!email}
            // appendChild={
            //   isSubmitting || isLoading ? (
            //     <Loader
            //       size={'16px'}
            //       stroke={'#0f0f0f'}
            //       strokeWidth={'1'}
            //       style={{ marginLeft: '4px' }}
            //     />
            //   ) : null
            // }
          />
        </FirstWrapper>
      )}

      {/* {step === 2 && (
        <div>
          <h2>Код підтвердження</h2>
          <p>Введіть код надісланий на ... </p>
          <Input
            testId="code"
            type="text"
            placeholder=""
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button onClick={handleVerifyCode} disabled={verifyingCode}>
            Далі
          </button>
        </div>
      )} */}

      {step === 3 && (
        <div>
          <h2>Новий пароль</h2>
          <p>Створіть новий пароль </p>
          <Input
            testId="password"
            type="password"
            placeholder="Пароль"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Input
            testId="confirmPassword"
            type="password"
            placeholder="Підтвердити пароль"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSubmitNewPassword} disabled={verifyingCode}>
            Зберегти новий пароль
          </button>
        </div>
      )}
    </Section>
  );
};

export default PasswordRecovery;
