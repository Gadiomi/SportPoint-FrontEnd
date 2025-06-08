import React, { useEffect, useState } from 'react';
import { ButtonsContainer } from '../../Schedule/components/ScheduleCard/ScheduleCard.styled';
import { useAppDispatch } from '@/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { setServiceId } from '@/redux/globalsStates/globalsStates';
import { useDeleteCoachServicesMutation } from '@/redux/coachServices/coachServicesApi';
import { Icon, IconName } from '@/kit';
import { ButtonsHiddenText } from '../../Schedule/components/CustomHeader/CustomHeader.styled';
import { Loading } from '@/components/ReviewItem/styles';
interface ServicesListProps {
  services: Array<{
    _id?: string;
    name: string;
    description: string;
    amount: number;
    image: string;
  }>;
}

type SingleService = {
  _id?: string;
  name: string;
  description: string;
  amount: number;
  image: string;
};

const ServicesList: React.FC<ServicesListProps> = ({ services }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(services);

  const [savedService, setSavedService] = useState<SingleService[]>(services);

  console.log(savedService);
  const handleEdit = (id: string) => {
    dispatch(setServiceId(id));
    localStorage.setItem('editServiceId', id);
    navigate('/profile/edit/edit-service');
  };
  const [deleteService] = useDeleteCoachServicesMutation();

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await deleteService(id).unwrap();
      setSavedService(prev => prev.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Помилка при видаленні:', error);
    }
  };

  useEffect(() => {
    setSavedService(services);
  }, [services, savedService]);

  return (
    <div>
      <ul>
        {savedService.map(service => (
          <li key={service._id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: {service.amount.toFixed(2)}</p>
            {service.image && <img src={service.image} alt={service.name} />}
            <ButtonsContainer>
              <button
                type="button"
                onClick={() => handleEdit(service._id ?? '')}
              >
                <Icon name={IconName.EDIT} width="20px" />
                <ButtonsHiddenText>Edit</ButtonsHiddenText>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(service._id ?? '')}
              >
                <Icon name={IconName.DELETE} width="20px" />
                <ButtonsHiddenText>Delete</ButtonsHiddenText>
              </button>
            </ButtonsContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
