import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  FormStyled,
  InputsBeginEnd,
  ScheduleContainer,
  TimeAndDateContainer,
} from '../../Schedule.styled';
import GeneralsBtn from '../../../GeneralsBtn/GeneralsBtn';
import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import SearchWork from '../../../SearchWork/SearchWork';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { SectionTitle } from '../../../EditGeneral/EditGeneral.styled';
import Calendar from '../Calendar/Calendar';
import { WorkoutPlan } from '@/types/userProfile';
import { useForm } from 'react-hook-form';
import { Profile, ScheduleEntry, SearchResults } from '../../types/schedule';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/hooks';
import { useAddScheduleMutation } from '@/redux/schedule/scheduleApi';
import { useNavigate } from 'react-router-dom';
import { dateFnsLocalizer, View } from 'react-big-calendar';
import { uk } from 'date-fns/locale';

const locales = {
  uk: uk,
};

const EditScheduleCard = () => {
  const localizer = useMemo(
    () =>
      dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
        getDay,
        locales,
      }),
    [],
  );

  const userProfile = useAppSelector(state => state.globalsStates.editId);
  console.log(userProfile);
  const [addSchedule] = useAddScheduleMutation();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('week');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<Profile[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  // const [savedSchedule, setSavedSchedule] = useState<ScheduleEntry[]>([]);
  const [backendSchedule, setBackendSchedule] = useState<ScheduleEntry[]>([]);
  const [localSearchResults, setLocalSearchResults] =
    useState<SearchResults | null>(null);

  const { t } = useTranslation();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    [],
  );

  const { data: searchResults, isFetching } = useGetByNameQuery(
    {
      name: debouncedSearchTerm,
      role: 'adminClub',
    },
    {
      skip: !debouncedSearchTerm,
    },
  );

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setLocalSearchResults(null);
    } else if (searchResults) {
      setLocalSearchResults(searchResults);
    }
  }, [debouncedSearchTerm, searchResults]);

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
  const preventViewChange = () => true;

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
    // setSavedSchedule(prev => [...prev, newEntry]);
    setBeginTime('');
    setEndTime('');
    setSelectedProfile([]);
    setSearchTerm('');
  };

  return (
    <Container>
      <ScheduleContainer>
        <Button
          onClick={() => navigate('/profile/edit/schedule')}
          title=""
          appearance={ButtonAppearance.UNDERLINED}
          testId="general"
          styles={{
            width: '100%',
            padding: '8px 18px',
            justifyContent: 'start',
          }}
          appendChild={
            <Icon name={IconName.ARROW_LEFT} styles={{ color: 'white' }} />
          }
        />
        <Calendar
          handleNavigate={handleNavigate}
          localizer={localizer}
          selectedDay={selectedDay}
          view={view}
          setView={setView}
          handleDrillDown={handleDrillDown}
          preventViewChange={preventViewChange}
        />
      </ScheduleContainer>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <TimeAndDateContainer>
          <SectionTitle>Дата та час послуги</SectionTitle>
          <Input
            testId="selected-time"
            value={(selectedDay && format(selectedDay, 'dd/MM/yyyy')) ?? ''}
            containerStyles={{ marginBottom: '8px' }}
          />
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
        </TimeAndDateContainer>

        <SearchWork
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          isFetching={isFetching}
          searchResults={localSearchResults}
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

        <GeneralsBtn t={t} />
      </FormStyled>
    </Container>
  );
};

export default EditScheduleCard;
