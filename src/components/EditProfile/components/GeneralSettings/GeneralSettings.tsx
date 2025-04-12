import { useAppSelector } from '@/hooks/hooks';
import General from '@/pages/AccountPage/General';
import EditGeneral from '../EditGeneral/EditGeneral';

const GeneralSettings = () => {
  const userProfile = useAppSelector(state => state.user.user);
  return (
    <>
      {/* {userProfile?.role === 'adminClub' && < />} */}
      {userProfile?.role === 'coach' && <EditGeneral />}
      {userProfile?.role === 'costumer' && <General />}
    </>
  );
};

export default GeneralSettings;
