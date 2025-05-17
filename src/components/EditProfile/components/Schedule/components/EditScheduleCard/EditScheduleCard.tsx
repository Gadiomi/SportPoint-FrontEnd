import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ButtonsContainerForEdit,
  Container,
  FormStyled,
  InputsBeginEnd,
  LocaleButtonsList,
  ScheduleContainer,
  TimeAndDateContainer,
} from '../../Schedule.styled';
import { Button, ButtonAppearance, Icon, IconName, Input } from '@/kit';
import { format } from 'date-fns';
import { SectionTitle } from '../../../EditGeneral/EditGeneral.styled';
import { WorkoutPlan } from '@/types/userProfile';
import { useForm } from 'react-hook-form';
import { Profile, ScheduleEntry, SearchResults } from '../../types/schedule';
import { useGetByNameQuery } from '@/redux/searchByName/searchByNameApi';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from '@/redux/schedule/scheduleApi';
import { useNavigate } from 'react-router-dom';
import { uk } from 'date-fns/locale';
import {
  LocaleButtonsContainerStyled,
  LocaleButtonsListItem,
} from '../../Schedule.styled';
import localizeButtons from '../../../../data/all-buttons.json';
import Map from '../Map/Map';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import SearchWork from '../../../SearchWork/SearchWork';
import { setScheduleId } from '@/redux/globalsStates/globalsStates';

const EditScheduleCard = () => {
  const dispatch = useAppDispatch();

  const [updateSchedule] = useUpdateScheduleMutation();
  const navigate = useNavigate();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<Profile[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [savedSchedule, setSavedSchedule] = useState<ScheduleEntry[]>([]);
  const [localSearchResults, setLocalSearchResults] =
    useState<SearchResults | null>(null);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');

  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState('club');

  const { t } = useTranslation();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    [],
  );
  console.log(selectedDay);
  const { data: searchResults, isFetching } = useGetByNameQuery(
    {
      name: debouncedSearchTerm,
      role: 'adminClub',
    },
    {
      skip: !debouncedSearchTerm,
    },
  );

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

  const { editId } = useAppSelector(state => state.globalsStates);
  useEffect(() => {
    const storedId = localStorage.getItem('editId');
    if (storedId) {
      dispatch(setScheduleId(storedId));
    }
  }, [dispatch]);
  console.log('editId:', editId);

  const { data: card, isLoading } = useGetScheduleQuery(editId);

  console.log(card);

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
    setSelectedProfile([profile]);
  };

  const handleBeginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeginTime(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDay(isNaN(date.getTime()) ? null : date);
  };

  const { handleSubmit } = useForm<WorkoutPlan>({
    defaultValues: {},
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!card || !card.date?.startTime || !card.date?.endTime) return;

    try {
      const startDate = new Date(card.date.startTime);
      const endDate = new Date(card.date.endTime);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn('Invalid date from backend:', card.date);
        return;
      }

      const transformed = {
        day: startDate,
        begin: format(startDate, 'HH:mm'),
        end: format(endDate, 'HH:mm'),
        _id: card._id,
        profile: {
          firstName: card.selectedGym,
          lastName: '',
          address: card.selection.address,
          city: card.selection.city,
          avatar: card.selection.avatar,
          id: card._id || 'default-id',
        },
        weekday: format(startDate, 'EEEE', { locale: uk }),
        monthShort: format(startDate, 'MMM', { locale: uk }),
      };
      if (card) {
        setSelectedProfile([transformed.profile] as any);
      }

      setSavedSchedule([transformed]);
      setBeginTime(format(startDate, 'HH:mm'));
      setEndTime(format(endDate, 'HH:mm'));
      setSelectedDay(startDate);
    } catch (error) {
      console.error('Failed to parse date:', error);
    }
  }, [card]);

  const convertScheduleToBackendFormat = () => {
    if (
      !selectedDay ||
      !beginTime ||
      !endTime ||
      selectedProfile.length === 0
    ) {
      alert('Оберіть день, час і користувача');
      return;
    }

    const entry = {
      day: selectedDay,
      begin: beginTime,
      end: endTime,
      profile: selectedProfile[0],
    };

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
  };

  const onSubmit = async () => {
    try {
      const backendReadySchedule = convertScheduleToBackendFormat();

      await updateSchedule({
        workoutPlans: backendReadySchedule,
        id: editId,
      }).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
    navigate('/profile/edit/schedule');
  };

  const addressHandler = () => {
    setIsOpenAddress(prev => !prev);
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
        <ScheduleCard
          savedSchedule={savedSchedule}
          setSavedSchedule={setSavedSchedule}
        />
      </ScheduleContainer>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <TimeAndDateContainer>
          <SectionTitle>Дата та час послуги</SectionTitle>
          <Input
            testId="selected-time"
            type="date"
            value={(selectedDay && format(selectedDay, 'yyyy-MM-dd')) ?? ''}
            onChange={handleDateChange}
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

        <LocaleButtonsContainerStyled>
          <h3>Оберіть місце проведення</h3>
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
            )}
            {selectedKey === 'locale' && <Map />}
          </div>
        </LocaleButtonsContainerStyled>

        <ButtonsContainerForEdit>
          <Button
            type="submit"
            title={t('account_page.save')}
            appearance={ButtonAppearance.SECONDARY}
            testId="save"
            styles={{
              width: '100%',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: 16,
              color: 'rgba(28, 27, 32, 1)',
              backgroundColor: 'rgba(183, 183, 185, 1)',
            }}
            prependChild={
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                  marginRight: '8px',
                }}
                width="24"
                name={IconName.CHECK_CONTAINED}
              />
            }
          />
          <Button
            type="button"
            title={t('account_page.back')}
            appearance={ButtonAppearance.UNDERLINED}
            testId="back"
            onClick={() => navigate('/profile/edit/schedule')}
            styles={{
              width: '100%',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: 16,
              color: '#F8F7F4',
            }}
          />
        </ButtonsContainerForEdit>
      </FormStyled>
    </Container>
  );
};

export default EditScheduleCard;
