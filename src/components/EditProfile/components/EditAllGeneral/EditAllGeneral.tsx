import { useAppSelector } from '@/hooks/hooks';
import { Outlet } from 'react-router-dom';
import { SectionStyled } from '../../EditProfiles.style';
import EditGeneral from '../EditGeneral/EditGeneral';
import General from '@/pages/AccountPage/General';

const EditAllGeneral = () => {
  const userProfile = useAppSelector(state => state.user.user);
  return (
    <SectionStyled>
      {/* {userProfile?.role === 'adminClub' && < />} */}
      {userProfile?.role === 'coach' && <EditGeneral />}
      {userProfile?.role === 'customer' && <General />}
      <Outlet />
    </SectionStyled>
  );
};

export default EditAllGeneral;
