import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Icon, IconName, Button, ButtonAppearance } from '@/kit';
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

interface FormData {
  name: string;
  phone: string;
  checkbox_1: boolean;
  checkbox_2?: boolean;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Ім'я має містити не менше 2 літер")
    .max(32, "Ім'я не може містити більше 32 літер")
    .matches(/^[A-Za-zА-Яа-яЇїІіЄєҐґ\s'-]+$/, "Ім'я має містити лише літери")
    .required("Ім'я обов'язкове"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Формат телефону +380XXXXXXXXX')
    .required("Телефон обов'язковий"),
  checkbox_1: yup
    .boolean()
    .oneOf([true], 'Для продовження, погодьтесь з умовами оферти')
    .required('Необхідно погодитися з умовами'),
});

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
  const [phoneValue, setPhoneValue] = useState('');

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      checkbox_1: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Відправлені дані:', data);
    reset();
    onClose();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      const onlyLetters = value.replace(
                        /[^A-Za-zА-Яа-яЇїІіЄєҐґ\s'-]/g,
                        '',
                      );
                      field.onChange(onlyLetters);
                    }}
                    value={field.value}
                    style={{
                      ...fonts.modalInput,
                      color: theme.color.secWhite,
                      padding: '10px',
                      width: '100%',
                    }}
                    testId="name-input"
                    label="Ваше Ім’я*"
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    onChange={e => {
                      const input = e.target.value;

                      const cleaned = input.replace(/[^\d]/g, '');

                      if (!cleaned.startsWith('380')) {
                        setPhoneValue('+380' + cleaned.slice(0, 9));
                        field.onChange('+380' + cleaned.slice(0, 9));
                      } else {
                        setPhoneValue('+' + cleaned.slice(0, 12));
                        field.onChange('+' + cleaned.slice(0, 12));
                      }
                    }}
                    onFocus={() => {
                      if (!phoneValue || !phoneValue.startsWith('+380')) {
                        setPhoneValue('+380');
                        field.onChange('+380');
                      }
                    }}
                    style={{
                      ...fonts.modalInput,
                      color: theme.color.secWhite,
                      padding: '10px',
                    }}
                    testId="phone-input"
                    label="Ваш номер телефону*"
                    type="tel"
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <CheckboxContainer>
                <Controller
                  name="checkbox_1"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Checkbox_1>
                      <div
                        style={{ width: 'auto' }}
                        onClick={() => field.onChange(!field.value)}
                      >
                        <Icon
                          name={
                            field.value
                              ? IconName.CHECK_FILL
                              : IconName.CHECK_SQUARE_CONTAINED
                          }
                          styles={{
                            cursor: 'pointer',
                            fill: 'transparent',
                            width: '24px',
                            height: '24px',
                            marginRight: '8px',
                          }}
                        />
                      </div>
                      <CustomCheckbox
                        containerStyle={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                        checked={field.value}
                        onChange={field.onChange}
                        label="Я згодний(а) на обрабку даних та з умовами оферти."
                        inputStyle={{ display: 'none' }}
                        labelStyle={{ textAlign: 'left', ...fonts.modalSpan }}
                        errorMessage={fieldState.error?.message}
                      />
                    </Checkbox_1>
                  )}
                />
                <Controller
                  name="checkbox_2"
                  control={control}
                  render={({ field }) => (
                    <Checkbox_2>
                      <div
                        style={{ width: 'auto' }}
                        onClick={() => field.onChange(!field.value)}
                      >
                        <Icon
                          name={
                            field.value
                              ? IconName.CHECK_FILL
                              : IconName.CHECK_SQUARE_CONTAINED
                          }
                          styles={{
                            cursor: 'pointer',
                            fill: 'transparent',
                            width: '24px',
                            height: '24px',
                            marginRight: '8px',
                          }}
                        />
                      </div>
                      <CustomCheckbox
                        checked={field.value}
                        onChange={field.onChange}
                        label="Прошу не дзвонити, а зв’язатися у месенджері за вказаним номером."
                        inputStyle={{ display: 'none' }}
                        labelStyle={{ textAlign: 'left', ...fonts.modalSpan }}
                      />
                    </Checkbox_2>
                  )}
                />
                <Button
                  testId="details_page.send"
                  title={t('details_page.send')}
                  type="submit"
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
            </div>
          </form>
        </ModalContent>
        <ModalFooter></ModalFooter>
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
