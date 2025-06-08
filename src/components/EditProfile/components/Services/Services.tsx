import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import localizeButtons from '../../data/all-buttons.json';
import ServicesList from './components/ServicesList';
import { useGetCoachServicesQuery } from '@/redux/coachServices/coachServicesApi';

const Services = () => {
  const navigate = useNavigate();
  const { data: servicesResponse } = useGetCoachServicesQuery();
  const services = servicesResponse?.data.data ?? [];
  const safeServices = services.map(service => ({
    _id: service._id,
    name: service.name,
    description: service.description ?? 'Опис недоступний',
    amount: service.amount ?? 0,
    image: service.image ?? '',
  }));
  console.log(safeServices);
  return (
    <div>
      <Button
        onClick={() => navigate('/profile/edit')}
        title={localizeButtons.titles.services}
        appearance={ButtonAppearance.PRIMARY}
        testId="services"
        style={{ width: '100%', padding: '8px 18px' }}
        appendChild={
          <Icon name={IconName.ARROW_LEFT} styles={{ color: 'currentColor' }} />
        }
        prependChild={
          <Icon name={IconName.ACCOUNT} styles={{ color: 'currentColor' }} />
        }
      />
      <ServicesList services={safeServices} />
      <Button
        testId="addService"
        onClick={() => navigate('/profile/edit/add-servers')}
        title={localizeButtons.titles.add_service}
        appearance={ButtonAppearance.SECONDARY}
        style={{ width: '100%', padding: '8px 18px', marginTop: '16px' }}
        prependChild={
          <Icon name={IconName.ADD_SQUARE} styles={{ color: 'currentColor' }} />
        }
      />
    </div>
  );
};

export default Services;
