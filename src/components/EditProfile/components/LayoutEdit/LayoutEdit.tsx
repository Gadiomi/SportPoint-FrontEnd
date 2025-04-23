import { Outlet } from 'react-router-dom';
import { Container } from '@/components/ContainerAndSection';

const LayoutEdit = () => {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default LayoutEdit;
