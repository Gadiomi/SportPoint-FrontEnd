import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/kit';
import { Icon, IconName } from '@/kit';
import { Button, ButtonAppearance } from '@/kit';
import { CustomCheckbox } from '@/kit/CustomCheckbox';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
  CheckboxContainer,
  Checkbox_1,
  Checkbox_2,
} from './styles';

interface ModalGetInTouchProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ModalGetInTouch: React.FC<ModalGetInTouchProps> = ({
  isOpen,
  onClose,
  title,
}: ModalGetInTouchProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCheckboxChange1 = () => {
    setChecked1(!checked1);
  };

  const handleCheckboxChange2 = () => {
    setChecked2(!checked2);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader style={fonts.modalTitle}>{title}</ModalHeader>
        <ModalContent>
          <form>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <Input
                style={{
                  ...fonts.modalInput,
                  color: theme.color.secWhite,
                  padding: '10px',
                  width: '100%',
                }}
                testId="name-input"
                value={name}
                onChange={handleNameChange}
                label="Ваше Ім’я"
              />

              <Input
                style={{
                  ...fonts.modalInput,
                  color: theme.color.secWhite,
                  padding: '10px',
                }}
                testId="phone-input"
                value={phone}
                onChange={handlePhoneChange}
                label="Ваш номер телефону"
                type="tel"
              />
            </div>
          </form>
        </ModalContent>
        <ModalFooter>
          <CheckboxContainer>
            <Checkbox_1>
              <div onClick={handleCheckboxChange1} style={{ width: 'auto' }}>
                <Icon
                  name={
                    checked1
                      ? IconName.CHECK_FILL
                      : IconName.CHECK_SQUARE_CONTAINED
                  }
                  styles={{
                    cursor: 'pointer',
                    fill: checked1 ? 'transparent' : 'transparent',
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                  }}
                />
              </div>
              <CustomCheckbox
                checked={checked1}
                onChange={handleCheckboxChange1}
                label="Я згодний(а) на обрабку даних та з умовами оферти."
                inputStyle={{ display: 'none' }}
                labelStyle={{ textAlign: 'left' }}
              />
            </Checkbox_1>
            <Checkbox_2>
              <div onClick={handleCheckboxChange2} style={{ width: 'auto' }}>
                <Icon
                  name={
                    checked2
                      ? IconName.CHECK_FILL
                      : IconName.CHECK_SQUARE_CONTAINED
                  }
                  styles={{
                    cursor: 'pointer',
                    fill: checked1 ? 'transparent' : 'transparent',
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                  }}
                />
              </div>
              <CustomCheckbox
                checked={checked2}
                onChange={handleCheckboxChange2}
                label="Прошу не дзвонити, а зв’язатися у месенджері за вказаним номером."
                inputStyle={{ display: 'none' }}
                labelStyle={{ textAlign: 'left' }}
              />
            </Checkbox_2>
            <Button
              testId="details_page.send"
              title={t('details_page.send')}
              appearance={ButtonAppearance.PRIMARY}
              prependChild={
                <Icon
                  styles={{
                    color: 'currentColor',
                    fill: 'transparent',
                  }}
                  name={IconName.MAIL}
                />
              }
              style={{ ...fonts.secondManrope, gap: '10px' }}
            />
          </CheckboxContainer>
        </ModalFooter>
        <Button
          testId="details_page.close_modal"
          title=""
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            border: 'none',
            padding: '0',
          }}
          appearance={ButtonAppearance.UNDERLINED}
          appendChild={
            <Icon
              styles={{
                ...fonts.secondManrope,
                color: theme.color.mainWhite,
                fill: 'transparent',
                width: '24px',
                height: '24px',
              }}
              name={IconName.X}
            />
          }
        ></Button>
      </ModalContainer>
    </Backdrop>
  );
};

export default ModalGetInTouch;
