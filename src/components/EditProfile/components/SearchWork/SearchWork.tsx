import React, { FC, useEffect, useState } from 'react';
import { InputsSection } from '../EditGeneral/EditGeneral.styled';
import { SelectedItem, SelectedItems } from '../Selection/Selection.styled';
import { CitySpan, WorksWrapper } from './SearchWork.styled';
import { MergedProps } from '../Schedule/types/schedule';
import { AddressWrapper } from '@/pages/RegisterPage/components/AddressWidget/styles';
import GroupTitle from '@/pages/RegisterPage/components/GroupTitle/GroupTitle';
import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormData } from '@/types';
import CitySelect from '@/pages/RegisterPage/components/CitySelect';
import { cityOptions } from '@/pages/RegisterPage/tempData';
import Select, { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';
import { useGetCardsQuery } from '@/redux/cards/cardApi';
import AddressWidget from '@/pages/RegisterPage/components/AddressWidget/AddressWidget';

export type OptionType = {
  label: string;
  value: string;
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  description: {
    address?: string;
    city?: string;
  };
};

const MergedAddressSearchWidget: FC<MergedProps> = ({
  handler,
  isOpen,
  title,
  contentRef,
  height,
  isFetching,
  searchResults,
  setSelectedProfile,
  selectedProfile,
  view,
  label,
  setIsCityOpen,
  setIsClubOpen,
  setSearchTerm,
}) => {
  const theme = useTheme();

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      outline: 'none',
      boxShadow: 'none',
      backgroundColor: theme.color.background,
      border: `1px solid ${theme.color.secWhite}`,
      color: theme.color.white,
      borderRadius: state.menuIsOpen ? '6px 6px 0 0' : '6px',
      padding: theme.pxs.x1,
      fontSize: '14px',

      '&:hover': {
        border: `1px solid ${theme.color.secWhite}`,
      },
    }),
    valueContainer: base => ({
      ...base,
      padding: '0px 8px',
    }),
    input: base => ({
      ...base,
      color: theme.color.mainWhite,
    }),
    indicatorsContainer: base => ({
      ...base,
      width: 'auto',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.selectProps.menuIsOpen
        ? theme.color.mainWhite
        : theme.color.secWhite,
      transition: `transform  ${theme.transitions.rotate}`,
      transform: state.selectProps.menuIsOpen
        ? 'rotate(180deg)'
        : 'rotate(0deg)',
      padding: theme.pxs.x0,

      '& svg': {
        width: theme.pxs.x6,
        height: theme.pxs.x6,
      },
      '&:hover svg': {
        fill: theme.color.mainWhite,
        stroke: theme.color.mainWhite,
      },
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none',
    }),
    menu: base => ({
      ...base,
      backgroundColor: theme.color.background,
      borderRadius: '0 0 6px 6px',
      marginTop: '-1px',
      padding: theme.pxs.x2,
      border: `1px solid ${theme.color.secWhite}`,
      borderTop: 'none',
    }),

    option: base => ({
      ...base,
      color: theme.color.background,
      backgroundColor: theme.color.white,
      padding: theme.pxs.x2,
      cursor: 'pointer',
      ':first-of-type': {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      },
      ':last-of-type': {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      },
      ':not(:last-of-type)': {
        borderBottom: `1px solid ${theme.color.secWhite}`,
      },
    }),
    singleValue: base => ({
      ...base,
      color: theme.color.white,
      padding: theme.pxs.x0,
      margin: theme.pxs.x0,
    }),
  };

  const { control, watch } = useFormContext<RegisterFormData>();

  const watchedCity = watch('city');

  const [city, setCity] = useState<string>('');

  useEffect(() => {
    if (
      watchedCity &&
      typeof watchedCity === 'object' &&
      'value' in watchedCity
    ) {
      setCity(watchedCity.value);
    } else if (typeof watchedCity === 'string') {
      setCity(watchedCity);
    }
  }, [watchedCity]);

  const { data: cards, isLoading } = useGetCardsQuery(
    { city, role: 'adminClub' },
    { skip: !city },
  );
  console.log(cards);
  useEffect(() => {
    if (searchResults?.profiles && searchResults.profiles.length > 0) {
      setIsClubOpen?.(true);
    }
  }, [searchResults, setIsClubOpen]);

  useEffect(() => {
    if (searchResults?.profiles && searchResults.profiles.length > 0) {
      setIsClubOpen?.(true);
    }
  }, [searchResults, setIsClubOpen]);
  return (
    <WorksWrapper>
      {selectedProfile &&
        selectedProfile.map(work => (
          <SelectedItems key={work.id}>
            <SelectedItem>
              {work.firstName}
              <span> {work.lastName}</span>
              <CitySpan>
                ({work?.city}
                <span>{work.address}</span>)
              </CitySpan>
            </SelectedItem>
          </SelectedItems>
        ))}

      <AddressWidget
        handler={handler}
        isOpen={isOpen}
        contentRef={contentRef}
        height={height}
        title={title}
      >
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <CitySelect
                field={field}
                options={cityOptions}
                placeholder={'Оберіть місто'}
                onMenuOpen={() => setIsCityOpen?.(true)}
                onMenuClose={() => setIsCityOpen?.(false)}
                onChange={selectedCity => {
                  if (selectedCity) {
                    field.onChange(selectedCity);
                    setCity(selectedCity.value);
                  }
                }}
              />
            );
          }}
        />
        <InputsSection view={view}>
          <div>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                const clubOptions = () => {
                  if (
                    searchResults &&
                    searchResults.profiles &&
                    searchResults.profiles.length > 0
                  ) {
                    return searchResults.profiles.map(profile => ({
                      label: `${profile.firstName} ${profile.lastName}`,
                      value: profile._id,
                      _id: profile._id,
                      firstName: profile.firstName,
                      lastName: profile.lastName,
                      avatar: profile.avatar,
                      description: {
                        address: profile.description?.address,
                        city: profile.description?.city,
                      },
                    }));
                  } else if (cards?.data?.data && cards.data.data.length > 0) {
                    return cards.data.data.map(card => ({
                      label: `${card.firstName} ${card.lastName}`,
                      value: card._id,
                      _id: card._id,
                      firstName: card.firstName,
                      lastName: card.lastName,
                      avatar: card.avatar,
                      description: {
                        address: card.description?.address,
                        city: card.description?.city,
                      },
                    }));
                  }
                  return [];
                };
                return (
                  <Select
                    {...field}
                    options={clubOptions()}
                    value={
                      clubOptions().find(
                        option => option.value === selectedProfile?.id,
                      ) || null
                    }
                    onChange={selectedOption => {
                      if (selectedOption) {
                        setSelectedProfile({
                          id: selectedOption._id,
                          firstName: selectedOption.firstName,
                          lastName: selectedOption.lastName,
                          address: selectedOption.description.address,
                          city: selectedOption.description.city,
                          avatar: selectedOption.avatar,
                        });
                        field.onChange(selectedOption.value);
                      }
                    }}
                    onMenuOpen={() => setIsCityOpen?.(true)}
                    onMenuClose={() => setIsCityOpen?.(false)}
                    placeholder={label}
                    styles={customStyles}
                    menuPortalTarget={null}
                    menuPosition="absolute"
                    onInputChange={e => setSearchTerm?.(e)}
                  />
                );
              }}
            />
          </div>
          {searchResults?.profiles?.length === 0 && !isFetching && (
            <div>Нічого не знайдено</div>
          )}
        </InputsSection>
      </AddressWidget>
    </WorksWrapper>
  );
};

export default MergedAddressSearchWidget;
