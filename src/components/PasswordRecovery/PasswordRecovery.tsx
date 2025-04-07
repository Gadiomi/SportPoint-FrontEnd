import { Input } from '@/kit';
import {
  useSendRecoveryCodeMutation,
  useVerifyCodeMutation,
} from '@/redux/password/passwordApi';
import React, { useState } from 'react';
import { Container, Section } from '@/components/ContainerAndSection';
import { FontFamily } from '@/kit';

// interface RestoreModalProps {
//   onClose: () => void;
// }

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const [sendRecoveryCode, { isLoading: sendingCode }] =
    useSendRecoveryCodeMutation();
  const [verifyCode, { isLoading: verifyingCode }] = useVerifyCodeMutation();

  const handleSendCode = async () => {
    try {
      await sendRecoveryCode(email).unwrap();
      setStep(2);
    } catch (error) {
      console.error('Failed to send recovery code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode({ password: newPassword, code }).unwrap();
      setStep(3);
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
  };

  const handleSubmitNewPassword = () => {
    alert('Пароль успішно змінено!');
  };

  return (
    <Section styles={{ fontFamily: `${FontFamily}`, minHeight: '100vh' }}>
      {/* <button onClick={onClose}>Закрити</button> */}
      {step === 1 && (
        <div>
          <h2>Відновлення паролю</h2>
          <p>Введіть електронну пошту для відновлення акаунта</p>
          <Input
            testId="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleSendCode} disabled={sendingCode}>
            Надіслати код
          </button>
        </div>
      )}

      {step === 2 && (
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
      )}

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
            testId="password"
            type="password"
            placeholder="Підтвердити пароль"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button onClick={handleSubmitNewPassword}>Далі</button>
        </div>
      )}
    </Section>
  );
};

export default PasswordRecovery;
