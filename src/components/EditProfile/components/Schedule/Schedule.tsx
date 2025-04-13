declare module 'react-big-calendar';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { momentLocalizer, View, EventProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import schedule from '../../data/schedule.json';
import {
  Container,
  FormStyled,
  InputsBeginEnd,
  ScheduleContainer,
  StyledCalendar,
} from './Schedule.styled';
import CustomHeader from './components/CustomHeader/CustomHeader';
import CustomDateCellWrapper from './components/CustomDateCellWrapper/CustomDateCellWrapper';
import { useAppSelector } from '@/hooks/hooks';
import CustomToolbar from './components/CustomToolbar/CustomToolbar';
import SearchWork from '../SearchWork/SearchWork';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import { debounce } from 'lodash';
import { UserProfile } from '@/types/userProfile';
import { useUpdateUserProfileMutation } from '@/redux/user/userApi';
import GeneralsBtn from '../GeneralsBtn/GeneralsBtn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SectionTitle } from '../EditGeneral/EditGeneral.styled';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
}

const CustomWeekEvent: React.FC<EventProps<Event>> = ({ event }) => {
  return (
    <div style={{ padding: '5px', textAlign: 'center' }}>
      <strong>{event.title}</strong>
    </div>
  );
};

const Schedule = () => {
  const userProfile = useAppSelector(state => state.user.user);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const navigate = useNavigate();
  const [view, setView] = useState<View>('week');
  // const [date, setDate] = useState<Date>(new Date());

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<Profile[]>([]);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const { t } = useTranslation();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [userProfile, debouncedSearch, setSelectedProfile]);

  useEffect(() => {
    if (selectedDay) {
      console.log('Вибраний день:', selectedDay);
    } else {
      console.log('selectedDay is null');
    }
  }, [selectedDay]);

  const { data: searchResults, isFetching } = useGetByNameQuery(
    {
      name: debouncedSearchTerm,
      role: 'adminClub',
    },
    {
      skip: !debouncedSearchTerm,
    },
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchTerm(value);

    if (value === '') {
      setDebouncedSearchTerm('');
    } else {
      debouncedSearch(value);
    }
  };

  const handleSelectProfile = (profile: Profile) => {
    setSelectedProfile((prevProfiles: Profile[]) => {
      if (prevProfiles.some(p => p.id === profile.id)) {
        return prevProfiles;
      }
      return [...prevProfiles, profile];
    });
  };

  const handleDayClick = (slotInfo: { start: Date }) => {
    if (slotInfo.start) {
      const selectedDate = new Date(slotInfo.start);
      console.log('Вибраний день:', selectedDate);
      setSelectedDay(selectedDate);
    } else {
      console.error('slotInfo.start is null');
    }
  };

  const handleBeginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeginTime(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const preventViewChange = () => {
    return false;
  };
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<UserProfile>({
      defaultValues: userProfile || {},
      shouldUnregister: false,
    });

  const onSubmit = async (formData: UserProfile) => {
    try {
      const formDataToSend = new FormData();

      const descriptionData = {
        experience: formData.description.experience,
      };

      formDataToSend.append('description', JSON.stringify(descriptionData));

      const response = await updateUserProfile(formDataToSend).unwrap();
      return response;
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Container>
      <ScheduleContainer>
        <Button
          onClick={() => navigate('/profile')}
          title="РОЗКЛАД РОБОТИ"
          appearance={ButtonAppearance.PRIMARY}
          testId="general"
          style={{ width: '100%', padding: '8px 18px' }}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_LEFT}
            />
          }
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ACCOUNT}
            />
          }
        />
        <StyledCalendar
          localizer={localizer}
          defaultDate={new Date()}
          date={selectedDay || new Date()}
          view={view}
          onView={(newView: View) => setView(newView)}
          onNavigate={(newDate: Date) => setSelectedDay(newDate)}
          selectable
          onSelectSlot={handleDayClick}
          onSelecting={preventViewChange}
          components={{
            toolbar: props => (
              <>
                <CustomToolbar
                  onNavigate={props.onNavigate}
                  onView={props.onView}
                  schedule={schedule}
                  activeView={view}
                />
                <CustomHeader
                  date={props.date}
                  view={props.view}
                  onNavigate={props.onNavigate}
                />
              </>
            ),
            week: {
              header: CustomDateCellWrapper,
            },
          }}
        />
      </ScheduleContainer>

      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <div>
          <SectionTitle>Робочі години</SectionTitle>
          <InputsBeginEnd>
            <Input
              testId="begin"
              value={beginTime}
              label="Початок"
              title="Початок"
              onChange={handleBeginChange}
            />
            <Input
              testId="end"
              value={endTime}
              label="Кінець"
              title="Кінець"
              onChange={handleEndChange}
            />
          </InputsBeginEnd>
        </div>
        <SearchWork
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          isFetching={isFetching}
          searchResults={searchResults}
          setSelectedProfile={handleSelectProfile}
          selectedProfile={selectedProfile}
          title={'Обрати клуб'}
          view={true}
        />
        <GeneralsBtn t={t} />
      </FormStyled>
    </Container>
  );
};

export default Schedule;
