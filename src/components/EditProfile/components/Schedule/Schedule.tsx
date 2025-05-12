import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, ButtonAppearance, Icon, IconName, Input, Modal } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { View, dateFnsLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Container,
  FormStyled,
  InputsBeginEnd,
  ScheduleContainer,
  TimeAndDateContainer,
} from './Schedule.styled';
import { useAppSelector } from '@/hooks/hooks';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import { debounce } from 'lodash';
import { WorkoutPlan } from '@/types/userProfile';
import GeneralsBtn from '../GeneralsBtn/GeneralsBtn';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { SectionTitle } from '../EditGeneral/EditGeneral.styled';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useAddScheduleMutation } from '@/redux/schedule/scheduleApi';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import { Profile, ScheduleEntry, SearchResults } from './types/schedule';
import Calendar from './components/Calendar/Calendar';
import Services from './components/Services/Services';
import TimeInput from './components/TimeInput/TimeInput';
import CitySelect from '@/pages/RegisterPage/components/CitySelect';
import AddressWidget from '@/pages/RegisterPage/components/AddressWidget/AddressWidget';
import { cityOptions } from '@/pages/RegisterPage/tempData';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormData } from '@/types';
import { RegisterFormSchema } from '@/constants/validationSchemas/auth';
import MergedAddressSearchWidget from '../SearchWork/SearchWork';
import Map from './components/Map/Map';

const locales = {
  uk: uk,
};

const Schedule = () => {
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
  const [savedSchedule, setSavedSchedule] = useState<ScheduleEntry[]>([]);
  const [backendSchedule, setBackendSchedule] = useState<ScheduleEntry[]>([]);
  const [localSearchResults, setLocalSearchResults] =
    useState<SearchResults | null>(null);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');

  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  const contentsRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (contentsRef.current) {
      const scrollHeight = contentsRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    }
  }, []);
  useEffect(() => {
    if (isOpenAddress) {
      !isCityOpen && !isClubOpen ? setHeight('110px') : updateHeight();
    } else {
      setHeight('0px');
    }
  }, [isOpenAddress, isCityOpen, isClubOpen]);

  useEffect(() => {
    if (userProfile?.description.schedule) {
      const transformed = userProfile.description.schedule.map(item => ({
        day: new Date(item.date.startTime),
        begin: format(new Date(item.date.startTime), 'HH:mm'),
        end: format(new Date(item.date.endTime), 'HH:mm'),
        _id: item._id,
        profile: {
          firstName: item.selectedGym,
          lastName: '',
          address: item.selection.address,
          city: item.selection.city,
          avatar: item.selection.avatar,
          id: item._id || 'default-id',
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

        const filtered = transformed.filter(e => {
          const entryProfile = e.profile;
          if (!entryProfile.id) {
            entryProfile.id = 'default-id';
          }

          return !existingDates.has(getDateWithoutTime(new Date(e.day)));
        });

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
  console.log(debouncedSearchTerm);

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
    setSavedSchedule(prev => [...prev, newEntry]);
    setBeginTime('');
    setEndTime('');
    setSelectedProfile([]);
    setSearchTerm('');
  };
  const addressHandler = () => {
    setIsOpenAddress(prev => !prev);
  };

  return (
    <Container>
      <ScheduleContainer>
        <Button
          onClick={() => navigate('/profile/edit')}
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
            <TimeInput
              testId="begin"
              value={beginTime}
              label="з"
              onChange={handleBeginChange}
            />
            <TimeInput
              testId="end"
              value={endTime}
              label="до"
              onChange={handleEndChange}
            />
          </InputsBeginEnd>
        </TimeAndDateContainer>
        <div>
          Вид послуги
          <Services />
        </div>

        <MergedAddressSearchWidget
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          isFetching={isFetching}
          searchResults={localSearchResults}
          setSelectedProfile={handleSelectProfile}
          selectedProfile={selectedProfile}
          view={true}
          label="Пошук клубів"
          handler={addressHandler}
          isOpen={isOpenAddress}
          contentRef={contentsRef}
          height={height}
          title={'Оберіть місце проведення'}
          setIsCityOpen={setIsCityOpen}
          setIsClubOpen={setIsClubOpen}
          setSearchTerm={debouncedSearch}
        />

        <Map />
        <Button
          type="button"
          testId="add"
          title="Додати години"
          onClick={addNewScheduleEntry}
        />

        {savedSchedule.length > 0 && (
          <ScheduleCard
            savedSchedule={savedSchedule}
            setSavedSchedule={setSavedSchedule}
          />
        )}
        <GeneralsBtn t={t} />
      </FormStyled>
    </Container>
  );
};

export default Schedule;
