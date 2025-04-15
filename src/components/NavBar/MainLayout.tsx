import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Box } from './styles';

const MainLayout = () => {
  return (
    <Box>
      <Outlet />
      <NavBar />
    </Box>
  );
};

export default MainLayout;
