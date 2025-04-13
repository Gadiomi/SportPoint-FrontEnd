import { useAppSelector } from '@/hooks/hooks';
import EditCoach from './components/EditCoach/EditCoach';
import AccountPage from '@/pages/AccountPage/AccountPage';
import { SectionStyled } from './EditProfiles.style';

const EditProfile = () => {
  const userProfile = useAppSelector(state => state.user.user);
  return (
    <SectionStyled>
      {/* {userProfile?.role === 'adminClub' && < />} */}
      {userProfile?.role === 'coach' && <EditCoach />}
      {userProfile?.role === 'costumer' && <AccountPage />}
    </SectionStyled>
  );
};

export default EditProfile;
