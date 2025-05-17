import React from 'react';
import { format } from 'date-fns';
import {
  AccentSpan,
  ButtonsContainer,
  GymStyle,
  List,
  ListItem,
  TimeAndDateStyle,
  TitleAndButtons,
} from './ScheduleCard.styled';
import { Icon, IconName } from '@/kit';
import { ButtonsHiddenText } from '../CustomHeader/CustomHeader.styled';
import { useDeleteScheduleMutation } from '@/redux/schedule/scheduleApi';
import { ScheduleEntry } from '../../types/schedule';
import { useAppDispatch } from '@/hooks/hooks';
import { setScheduleId } from '@/redux/globalsStates/globalsStates';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const renderScheduleItem = (entry: ScheduleEntry, index?: number) => {
    const validDate =
      entry.day && !isNaN(new Date(entry.day).getTime())
        ? new Date(entry.day)
        : null;

    return (
      <ListItem key={index ?? entry._id}>
        <TitleAndButtons>
          <TimeAndDateStyle>
            <div>
              <span>{entry.weekday},</span>
              <span>
                {entry.monthShort}
                {validDate ? format(validDate, 'dd') : 'N/A'}
              </span>
            </div>
            <AccentSpan>
              {entry.begin} - {entry.end}
            </AccentSpan>
          </TimeAndDateStyle>
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
        </TitleAndButtons>
        <GymStyle>
          <img
            src={
              entry.profile.avatar
                ? entry.profile.avatar
                : '/public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg'
            }
            alt="avatar"
          />
          <span>
            {entry.profile.firstName} {entry.profile.lastName}
          </span>
        </GymStyle>
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
