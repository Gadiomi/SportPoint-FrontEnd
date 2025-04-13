import { REGEXP } from '@/pages/LogInPage/regexp';
import * as yup from 'yup';

export const LogInFormSchema = yup.object({
  email: yup
    .string()
    .required(REGEXP.email.mes.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          REGEXP.email.mes.mismatchSymbol,
          value,
          'email',
        );
      return true;
    })
    .matches(REGEXP.email.reg, REGEXP.email.mes.mismatch),
  password: yup
    .string()
    .required(REGEXP.password.mes.required)
    .min(6, REGEXP.password.mes.mismatchLessSymbols),
});

export const RegisterFormSchema = yup.object({
  email: yup
    .string()
    .required(REGEXP.email.mes.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          REGEXP.email.mes.mismatchSymbol,
          value,
          'email',
        );
      return true;
    })
    .matches(REGEXP.email.reg, REGEXP.email.mes.mismatch),
  password: yup
    .string()
    .required(REGEXP.password.mes.required)
    .min(6, REGEXP.password.mes.mismatchLessSymbols),
  confirm_password: yup
    .string()
    .required(REGEXP.password.mes.required)
    .oneOf([yup.ref('password')], REGEXP.password.mes.mustBeSame),
  first_name: yup.string().required(REGEXP.email.mes.required),
  second_name: yup.string().required(REGEXP.email.mes.required),
  club_name: yup.string().required(REGEXP.email.mes.required),
  phone: yup.string().required(REGEXP.email.mes.required),
  city: yup.string(),
  address: yup.string(),
  // abilities: yup.array().of(yup.string()),
  sport: yup.array().of(yup.string().required()),
});
