import { useGetCoachServicesQuery } from '@/redux/coachServices/coachServicesApi';
import { ServicesSelect, ServicesSelectContainer } from './Services.styled';

const Services = () => {
  const { data: servicesResponse } = useGetCoachServicesQuery();
  const services = servicesResponse?.data.data ?? [];

  const options = services.map(service => ({
    value: service._id,
    label: service.name,
  }));

  return (
    <ServicesSelectContainer>
      <ServicesSelect
        options={options}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
        styles={{
          control: base => ({
            ...base,
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '6px',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '8px',
            minHeight: '40px',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: 'white',
            padding: 0,
            marginLeft: 'auto',
            position: 'absolute',
            right: '-260px',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'transform 0.2s ease',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menu: base => ({
            ...base,
            backgroundColor: '#1f2937',
            color: 'white',
            zIndex: 10,
          }),
          menuPortal: base => ({
            ...base,
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4CAF50' : '#ccc',
            color: state.isSelected ? 'white' : 'black',
            padding: '8px 15px',
          }),
        }}
      />
    </ServicesSelectContainer>
  );
};

export default Services;
