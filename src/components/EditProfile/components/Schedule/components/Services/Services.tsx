import { useGetCoachServicesQuery } from '@/redux/coachServices/coachServicesApi';
import { ServicesSelectContainer } from './Services.styled';
import Select, { SingleValue } from 'react-select';
import React from 'react';
interface ServiceOption {
  label?: string;
}

interface ServicesProps {
  selectedService: SingleValue<ServiceOption>;
  setSelectedService: React.Dispatch<
    React.SetStateAction<SingleValue<ServiceOption>>
  >;
}
const Services = ({ selectedService, setSelectedService }: ServicesProps) => {
  const { data: servicesResponse } = useGetCoachServicesQuery();
  const services = servicesResponse?.data.data ?? [];

  const options: ServiceOption[] = services.map(service => ({
    value: service?._id,
    label: service?.name,
  }));

  const handleChange = (newValue: SingleValue<ServiceOption>) => {
    setSelectedService(newValue);
  };
  return (
    <ServicesSelectContainer>
      <Select<ServiceOption, false>
        value={selectedService}
        onChange={handleChange}
        options={options}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
        styles={{
          control: base => ({
            ...base,
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            minHeight: '48px',
            backgroundColor: '#323232',
            border: '0.50px solid #ed772f',
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: '#F8F7F4',
            fontWeight: '500',
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
            padding: '8px',
          }),
          menuPortal: base => ({
            ...base,
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? ' #294487' : 'transparent',
            color: state.isSelected ? '#ED772F' : '#F8F7F4',
            padding: '8px 15px',
            borderRadius: '8px',
            margin: '16px 0',
          }),
          placeholder: provided => ({
            ...provided,
            color: 'white',
            fontSize: '14px',
            fontWeight: '400',
          }),
        }}
        placeholder="Вид послуги"
      />
    </ServicesSelectContainer>
  );
};

export default Services;
