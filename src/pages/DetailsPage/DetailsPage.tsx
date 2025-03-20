import { Outlet } from 'react-router-dom';
import css from './DetailsPage.module.css';

const DetailsPage = () => {
  return (
    <div className={css.section}>
      <Outlet />
    </div>
  );
};

export default DetailsPage;
