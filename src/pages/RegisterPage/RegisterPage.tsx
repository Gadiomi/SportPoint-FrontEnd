import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/redux/auth';
import { CookiesKey, Roles } from '@/constants';

interface FormData {
  role: Roles;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const onSubmit = async (data: FormData) => {
    try {
      const response: any = await registerUser(data).unwrap();

      if (response.token && response.refreshToken) {
        Cookies.set(CookiesKey.TOKEN, response.token, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set(CookiesKey.REFRESH_TOKEN, response.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
      }
      reset();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="register-page">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="name">role</label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
          >
            {Object.values(Roles).map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
