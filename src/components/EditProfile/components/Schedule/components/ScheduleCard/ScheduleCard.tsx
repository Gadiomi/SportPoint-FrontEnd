import React from 'react';
import { format } from 'date-fns';
import {
  ButtonsContainer,
  DateAndMonthContainer,
  GymAndButtonsContainer,
  GymNameAndPlaceStyle,
  GymStyle,
  List,
  ListItem,
  ServiceStyle,
  TimeAndDateStyle,
  TitleDate,
  WeekDay,
} from './ScheduleCard.styled';
import { Icon, IconName } from '@/kit';
import { ButtonsHiddenText } from '../CustomHeader/CustomHeader.styled';
import { useDeleteScheduleMutation } from '@/redux/schedule/scheduleApi';
import { ScheduleEntry } from '../../types/schedule';
import { useAppDispatch } from '@/hooks/hooks';
import { setScheduleId } from '@/redux/globalsStates/globalsStates';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDuration } from '@/helpers/getDuration';

export interface ScheduleCardProps {
  savedSchedule: ScheduleEntry[] | ScheduleEntry | undefined;
  setSavedSchedule: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  savedSchedule,
  setSavedSchedule,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isEditPage = location.pathname === '/profile/edit/edit-schedule';

  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleEdit = (id: string) => {
    dispatch(setScheduleId(id));
    localStorage.setItem('editId', id);
    navigate('/profile/edit/edit-schedule');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSchedule(id).unwrap();
      setSavedSchedule(prev => prev.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Помилка при видаленні:', error);
    }
  };

  console.log(savedSchedule);

  const renderScheduleItem = (entry: ScheduleEntry, index?: number) => {
    const validDate =
      entry.day && !isNaN(new Date(entry.day).getTime())
        ? new Date(entry.day)
        : null;
    console.log(entry);

    return (
      <ListItem key={index}>
        <TitleDate>
          <TimeAndDateStyle>
            <div>
              <WeekDay>{entry.weekday}</WeekDay>
              <DateAndMonthContainer>
                <span> {validDate ? format(validDate, 'dd') : 'N/A'}</span>
                <span>{entry.monthShort}</span>
              </DateAndMonthContainer>
            </div>
          </TimeAndDateStyle>
        </TitleDate>
        <GymAndButtonsContainer>
          <GymStyle>
            <ServiceStyle>{entry.profile.service}</ServiceStyle>
            <ServiceStyle>
              {entry.begin} - {entry.end}
              <span> {getDuration(entry.begin, entry.end)}</span>
            </ServiceStyle>
            <div>
              <GymNameAndPlaceStyle>
                {entry.profile.firstName} <span>{entry.profile.hall}</span>
              </GymNameAndPlaceStyle>
            </div>
          </GymStyle>
          {!isEditPage && (
            <ButtonsContainer>
              <button type="button" onClick={() => handleEdit(entry._id ?? '')}>
                <Icon name={IconName.EDIT} width="20px" />
                <ButtonsHiddenText>Edit</ButtonsHiddenText>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(entry._id ?? '')}
              >
                <Icon name={IconName.DELETE} width="20px" />
                <ButtonsHiddenText>Delete</ButtonsHiddenText>
              </button>
            </ButtonsContainer>
          )}
        </GymAndButtonsContainer>
      </ListItem>
    );
  };

  return (
    <div>
      <List>
        {Array.isArray(savedSchedule)
          ? savedSchedule.map((entry, index) =>
              renderScheduleItem(entry, index),
            )
          : savedSchedule && renderScheduleItem(savedSchedule)}
      </List>
    </div>
  );
};

export default ScheduleCard;
