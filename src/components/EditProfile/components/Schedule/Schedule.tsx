import React, { useEffect, useMemo, useState } from 'react';
import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { View, dateFnsLocalizer } from 'react-big-calendar';

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
import { WorkoutPlan } from '@/types/userProfile';
import GeneralsBtn from '../GeneralsBtn/GeneralsBtn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SectionTitle } from '../EditGeneral/EditGeneral.styled';
import uaMessages from './components/uaMessages';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useAddScheduleMutation } from '@/redux/schedule/scheduleApi';
import ScheduleCard from './components/SchaduleCard/ScheduleCard';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  avatar?: string;
}

const locales = {
  uk: uk,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const Schedule = () => {
  const userProfile = useAppSelector(state => state.user.user);
  const [addSchedule] = useAddScheduleMutation();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('week');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<Profile[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const [savedSchedule, setSavedSchedule] = useState<
    {
      day: Date;
      begin: string;
      end: string;
      profile: Profile;
      weekday: string;
      monthShort: string;
    }[]
  >([]);

  const [backendSchedule, setBackendSchedule] = useState<
    {
      day: Date;
      begin: string;
      end: string;
      profile: Profile;
      weekday: string;
      monthShort: string;
    }[]
  >([]);

  useEffect(() => {
    if (userProfile?.description.schedule) {
      const transformed = userProfile.description.schedule.map(item => ({
        day: new Date(item.date.startTime),
        begin: format(new Date(item.date.startTime), 'HH:mm'),
        end: format(new Date(item.date.endTime), 'HH:mm'),
        profile: {
          firstName: item.selectedGym,
          lastName: '',
          address: item.selection.address,
          city: item.selection.city,
          avatar: item.selection.avatar,
          id: 'generated-id',
        },
        weekday: format(new Date(item.date.startTime), 'EEEE', { locale: uk }),
        monthShort: format(new Date(item.date.startTime), 'MMM', {
          locale: uk,
        }),
      }));

      setSavedSchedule(prev => {
        const getDateWithoutTime = (date: Date) =>
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          ).getTime();

        const existingDates = new Set(
          prev.map(e => getDateWithoutTime(new Date(e.day))),
        );

        const filtered = transformed.filter(
          e => !existingDates.has(getDateWithoutTime(new Date(e.day))),
        );

        return [...filtered, ...prev];
      });
    }
  }, [userProfile]);

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
  }, [userProfile, debouncedSearch]);

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

  const handleBeginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeginTime(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const { register, handleSubmit } = useForm<WorkoutPlan>({
    defaultValues: {},
    shouldUnregister: false,
  });

  const convertScheduleToBackendFormat = () => {
    return backendSchedule.map(entry => {
      const start = new Date(entry.day);
      const [startHour, startMin] = entry.begin.split(':');
      start.setHours(Number(startHour), Number(startMin));

      const end = new Date(entry.day);
      const [endHour, endMin] = entry.end.split(':');
      end.setHours(Number(endHour), Number(endMin));

      return {
        date: {
          startTime: start,
          endTime: end,
        },
        selection: {
          selectedType: `${entry.profile.firstName} ${entry.profile.lastName}`,
          city: entry.profile.city || '',
          address: entry.profile.address || '',
          avatar: entry.profile.avatar || '',
        },
        selectedGym: `${entry.profile.firstName} ${entry.profile.lastName}`,
      };
    });
  };
  const onSubmit = async () => {
    try {
      const backendReadySchedule = convertScheduleToBackendFormat();

      await addSchedule(backendReadySchedule).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  const preventViewChange = () => false;
  const handleDrillDown = (date: Date) => {
    setSelectedDay(date);
  };
  const handleNavigate = (date: Date) => {
    setSelectedDay(date);
  };

  const addNewScheduleEntry = () => {
    if (
      !selectedDay ||
      !beginTime ||
      !endTime ||
      selectedProfile.length === 0
    ) {
      alert('Оберіть день, час і користувача');
      return;
    }

    const weekday = format(selectedDay, 'EEEE', { locale: uk });
    const monthShort = format(selectedDay, 'MMM', { locale: uk });

    const newEntry = {
      day: selectedDay,
      begin: beginTime,
      end: endTime,
      profile: selectedProfile[0],
      weekday,
      monthShort,
    };

    setBackendSchedule(prev => [...prev, newEntry]);
    setSavedSchedule(prev => [...prev, newEntry]);
    setBeginTime('');
    setEndTime('');
    setSelectedProfile([]);
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
              name={IconName.ARROW_LEFT}
              styles={{ color: 'currentColor' }}
            />
          }
          prependChild={
            <Icon name={IconName.ACCOUNT} styles={{ color: 'currentColor' }} />
          }
        />
        <StyledCalendar
          onNavigate={handleNavigate}
          culture="uk"
          localizer={localizer}
          messages={uaMessages}
          date={selectedDay || new Date()}
          view={view}
          onView={setView}
          selectable
          onDrillDown={handleDrillDown}
          onSelecting={preventViewChange}
          dayPropGetter={date => {
            const isSelected =
              selectedDay &&
              date.getDate() === selectedDay.getDate() &&
              date.getMonth() === selectedDay.getMonth() &&
              date.getFullYear() === selectedDay.getFullYear();

            return {
              style: {
                backgroundColor: isSelected ? '#ed772f' : 'transparent',
                borderRadius: isSelected ? '8px' : undefined,
              },
            };
          }}
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
              type="time"
              label="Початок"
              title="Початок"
              onChange={handleBeginChange}
            />
            <Input
              testId="end"
              value={endTime}
              type="time"
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
          label="Пошук клубів"
        />

        <Button
          type="button"
          testId="add"
          title="Додати години"
          onClick={addNewScheduleEntry}
        />

        {savedSchedule.length > 0 && (
          <ScheduleCard savedSchedule={savedSchedule} />
        )}
        <GeneralsBtn t={t} />
      </FormStyled>{' '}
    </Container>
  );
};

export default Schedule;
