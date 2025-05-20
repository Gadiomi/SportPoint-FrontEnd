import { useAppSelector } from '@/hooks/hooks';
import EditCoach from './components/EditCoach/EditCoach';
import AccountPage from '@/pages/AccountPage/AccountPage';
import { SectionStyled } from './EditProfiles.style';
import { Outlet } from 'react-router-dom';
import EditAdmin from './components/EditAdmin/EditAdmin';

const EditProfile = () => {
  const userProfile = useAppSelector(state => state.user.user);
  return (
    <SectionStyled>
      {userProfile?.role === 'adminClub' && <EditAdmin />}
      {userProfile?.role === 'coach' && <EditCoach />}
      {userProfile?.role === 'customer' && <AccountPage />}
      <Outlet />
    </SectionStyled>
  );
};

export default EditProfile;
