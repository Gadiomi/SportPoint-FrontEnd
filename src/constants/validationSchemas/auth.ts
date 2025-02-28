import { REGEXP } from 'pages/LogInPage/regexp';
import * as yup from 'yup';

export const LogInFormSchema = yup.object({
  email: yup.string().required(REGEXP.email.mes.required),
  password: yup.string().required(REGEXP.email.mes.required),
});
