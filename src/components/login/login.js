import React, { useEffect } from 'react';
import { Checkbox, Input, Button } from '@nextui-org/react';
import { MailIcon } from '@/icons/MailIcon.jsx';
import { LockIcon } from '@/icons/LockIcon';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import { useLoginUserMutation } from '@/redux/services/userApi'; // Adjust the path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setAuthenticated } from '@/redux/features/authSlice';
import { setCookie } from 'cookies-next';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    await loginUser(data);
  };

  useEffect(() => {
    if (error) {
      toast.error('Invalid email or password', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    if (data) {
      dispatch(setAuthenticated(data.token));
      toast.success('Login Successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setCookie('authToken', data.token, {
        secure: true, // Use secure cookie (HTTPS)
        sameSite: 'none', // SameSite attribute set to None
        path: '/',
      });
      router.push('/dashboard');
    }
  }, [error, data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <div className='flex justify-center items-center min-h-screen p-5'>
        <div className='container'>
          <div className='max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold mb-4'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                autoFocus
                endContent={
                  <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                }
                label='Email'
                placeholder='Enter your email'
                variant='bordered'
                type='email'
                name='email'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}
              <Input
                endContent={
                  <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                }
                label='Password'
                placeholder='Enter your password'
                type='password'
                variant='bordered'
                className='mt-5'
                name='password'
                {...register('password')}
              />
              {errors.password && (
                <p className='text-red-600'>{errors.password.message}</p>
              )}
              <div className='flex py-2 px-1 justify-between'>
                <Checkbox
                  classNames={{
                    label: 'text-small',
                  }}
                >
                  Remember me
                </Checkbox>
              </div>
              <div>
                <Button
                  color='primary'
                  isLoading={isLoading}
                  className='w-full mt-3'
                  type='submit'
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
