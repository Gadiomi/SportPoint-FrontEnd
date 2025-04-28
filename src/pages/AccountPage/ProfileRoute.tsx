import { useAppSelector } from '@/hooks/hooks';
import { Outlet } from 'react-router-dom';
import AccountTrainer from '../DetailsPage/AccountTrainerPage/AccountTrainerPage';
import AccountAdminClub from '../DetailsPage/AccountAdminClubPage/AccountAdminClubPage';
import AccountPage from '../AccountPage/AccountPage';

const ProfileRoute = () => {
  const userProfile = useAppSelector(state => state.user.user);

  return (
    <>
      {userProfile?.role === 'coach' && <AccountTrainer id={userProfile._id} />}
      {userProfile?.role === 'adminClub' && <AccountAdminClub />}
      {userProfile?.role === 'customer' && <AccountPage />}
      <Outlet />
    </>
  );
};

export default ProfileRoute;
