import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Icon, IconName } from '@/kit';
import { sportTypes } from '../../tempData';
import { RegisterFormData } from '@/types';
import { SportsListWrapper } from '../../styles';

interface ISportsList {
  isOpenSports: boolean;
  selectedSports: string[];
  register: UseFormRegister<RegisterFormData>;
}

const SportsListChoice: FC<ISportsList> = ({
  isOpenSports,
  selectedSports,
  register,
}) => {
  return (
    <SportsListWrapper
      style={{
        height: isOpenSports ? 'auto' : '0px',
        paddingTop: isOpenSports ? '10px' : '0px',
      }}
    >
      {sportTypes.map(item => (
        <li key={item.label}>
          <input
            type="checkbox"
            id={item.label}
            value={item.value}
            {...register('sport')}
          />
          <label htmlFor={item.label}>
            {item.label}
            <Icon
              styles={{
                color: selectedSports.includes(item.value)
                  ? 'rgba(237, 119, 47, 1)'
                  : 'currentColor',
              }}
              name={
                selectedSports.includes(item.value)
                  ? IconName.CHECK_FILL
                  : IconName.CHECK_SQUARE_CONTAINED
              }
            />
          </label>
        </li>
      ))}
    </SportsListWrapper>
  );
};

export default SportsListChoice;
