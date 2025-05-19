import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { View, dateFnsLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Container,
  CustomButtonContainer,
  FormStyled,
  InputsBeginEnd,
  LocaleButtonsContainerStyled,
  LocaleButtonsList,
  LocaleButtonsListItem,
  ScheduleContainer,
  ServicesContainer,
  TimeAndDateContainer,
} from './Schedule.styled';
import { useAppSelector } from '@/hooks/hooks';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import { debounce } from 'lodash';
import { WorkoutPlan } from '@/types/userProfile';
import GeneralsBtn from '../GeneralsBtn/GeneralsBtn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SectionTitle } from '../EditGeneral/EditGeneral.styled';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import { uk } from 'date-fns/locale';
import {
  useAddScheduleMutation,
  useGetAllSchedulesQuery,
} from '@/redux/schedule/scheduleApi';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import { Profile, ScheduleEntry, SearchResults } from './types/schedule';
import Calendar from './components/Calendar/Calendar';
import Services from './components/Services/Services';
import TimeInput from './components/TimeInput/TimeInput';
import Map from './components/Map/Map';
import localizeButtons from '../../data/all-buttons.json';
import SearchWork from '../SearchWork/SearchWork';
import halls from '../../data/halls.json';
import Select from 'react-select';
import { getCustomStyles } from './customStyle';
import { useTheme } from 'styled-components';
import { Label } from '../Selection/Selection.styled';
const locales = {
  uk: uk,
};

type ScheduleItem = {
  _id: string;
  date: {
    startTime: string;
    endTime: string;
  };
  selectedGym: string;
  selection: {
    address: string;
    city: string;
    avatar: string;
  };
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

  const theme = useTheme();

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
  const [selectedHall, setSelectedHall] = useState<string | null>('');

  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState('club');

  const handleClick = (key: string) => {
    setSelectedKey(key);
  };
  const contentsRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (contentsRef.current) {
      const scrollHeight = contentsRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    }
  }, []);

  const { data: schedules } = useGetAllSchedulesQuery(undefined);

  useEffect(() => {
    if (isOpenAddress) {
      if (!isCityOpen && !isClubOpen) {
        setHeight('110px');
      } else {
        updateHeight();
      }
    } else {
      setHeight('0px');
    }
  }, [isOpenAddress, isCityOpen, isClubOpen, updateHeight]);

  useEffect(() => {
    if (schedules?.data?.data) {
      const transformed = schedules?.data?.data.map((item: ScheduleItem) => ({
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

        const filtered = transformed.filter((e: any) => {
          const entryProfile = e.profile;
          if (!entryProfile.id) {
            entryProfile.id = 'default-id';
          }

          return !existingDates.has(getDateWithoutTime(new Date(e.day)));
        });

        return [...filtered, ...prev];
      });
    }
  }, [schedules]);

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

  const handleBeginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeginTime(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const { handleSubmit } = useForm<WorkoutPlan>({
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
          selectedType: selectedHall,
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDay(isNaN(date.getTime()) ? null : date);
  };

  return (
    <Container>
      <ScheduleContainer>
        <Button
          onClick={() => navigate('/profile/edit')}
          title={localizeButtons.titles.working_schedule}
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
          <SectionTitle>{localizeButtons.titles.date_and_time}</SectionTitle>
          <Input
            testId="selected-time"
            type="date"
            value={(selectedDay && format(selectedDay, 'yyyy-MM-dd')) ?? ''}
            onChange={handleDateChange}
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
        <ServicesContainer>
          <SectionTitle> {localizeButtons.titles.services}</SectionTitle>
          <Services />
        </ServicesContainer>
        <LocaleButtonsContainerStyled>
          <h3>{localizeButtons.titles.choseCity}</h3>
          <LocaleButtonsList>
            {Object.entries(localizeButtons.localization).map(
              ([key, value]) => (
                <LocaleButtonsListItem
                  key={key}
                  $isActive={key === selectedKey}
                >
                  <button type="button" onClick={() => handleClick(key)}>
                    {value}
                  </button>
                </LocaleButtonsListItem>
              ),
            )}
          </LocaleButtonsList>
          <div>
            {selectedKey === 'club' && (
              <SearchWork
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                isFetching={isFetching}
                searchResults={localSearchResults}
                setSelectedProfile={setSelectedProfile}
                selectedProfile={selectedProfile}
                view={true}
                label={localizeButtons.titles.gym_search}
                handler={addressHandler}
                isOpen={isOpenAddress}
                contentRef={contentsRef}
                height={height}
                title={localizeButtons.titles.chosePlace}
                setIsCityOpen={setIsCityOpen}
                setIsClubOpen={setIsClubOpen}
                setSearchTerm={debouncedSearch}
              />
            )}
            {selectedKey === 'locale' && <Map />}
            <div>
              <Label htmlFor="description.address">Обрати залу</Label>
              <Select
                styles={getCustomStyles(theme)}
                options={halls.map(hall => ({ value: hall, label: hall }))}
                onChange={option =>
                  setSelectedHall(option ? option.value : null)
                }
                value={
                  halls.find(h => h === selectedHall)
                    ? { value: selectedHall, label: selectedHall }
                    : null
                }
                placeholder={userProfile?.description.address || 'Обрати залу'}
              />
            </div>
          </div>
        </LocaleButtonsContainerStyled>
        <CustomButtonContainer>
          <Button
            type="button"
            testId="add"
            title={localizeButtons.titles.add_hours}
            onClick={addNewScheduleEntry}
          />
        </CustomButtonContainer>

        {savedSchedule.length > 0 && (
          <ScheduleCard
            savedSchedule={savedSchedule}
            setSavedSchedule={setSavedSchedule}
          />
        )}
        <GeneralsBtn t={t} navigateTo="/profile/edit" />
      </FormStyled>
    </Container>
  );
};

export default Schedule;
