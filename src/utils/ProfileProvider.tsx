import React, { useEffect } from 'react';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '@/redux/user/userProfileSlice';
import { FormProvider } from 'react-hook-form';
import { FC } from 'react';
interface ProfileProviderProps {
  children: React.ReactNode;
  methods: any;
}
const ProfileProvider: FC<ProfileProviderProps> = ({ children, methods }) => {
  const { data: userData, isSuccess } = useGetUserProfileQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUserProfile(userData.userProfile));
    }
  }, [userData, isSuccess, dispatch]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProfileProvider;
