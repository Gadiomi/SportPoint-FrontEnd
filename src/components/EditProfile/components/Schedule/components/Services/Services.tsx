import { useGetCoachServicesQuery } from '@/redux/coachServices/coachServicesApi';
import Select from 'react-select';

const Services = () => {
  const { data: servicesResponse } = useGetCoachServicesQuery();
  const services = servicesResponse?.data.data ?? [];

  const options = [
    ...services.map(service => ({
      value: service._id,
      label: service.name,
    })),
  ];

  return (
    <div>
      <Select
        options={options}
        className="custom-select"
        styles={{
          control: base => ({
            ...base,
            backgroundColor: 'transparent',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }),
          menu: base => ({
            ...base,
            backgroundColor: '#1f2937',
            color: 'white',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4CAF50' : '#ccc',
            color: state.isSelected ? 'white' : 'black',
            padding: '8px 15px',
          }),
        }}
      />
    </div>
  );
};

export default Services;
