import * as yup from 'yup';

export const LogInFormSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});
