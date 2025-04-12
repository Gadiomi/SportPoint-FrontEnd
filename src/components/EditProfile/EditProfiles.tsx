import { useAppSelector } from '@/hooks/hooks';
import EditCoach from './components/EditCoach/EditCoach';
import AccountPage from '@/pages/AccountPage/AccountPage';

const EditProfile = () => {
  const userProfile = useAppSelector(state => state.user.user);
  return (
    <>
      {/* {userProfile?.role === 'adminClub' && < />} */}
      {userProfile?.role === 'coach' && <EditCoach />}
      {userProfile?.role === 'costumer' && <AccountPage />}
    </>
  );
};

export default EditProfile;
