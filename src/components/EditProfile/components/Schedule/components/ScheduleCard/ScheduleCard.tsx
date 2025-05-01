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
import { useNavigate } from 'react-router-dom';

export interface ScheduleCardProps {
  setOpen: (value: boolean) => void;
  savedSchedule: ScheduleEntry[];
  setSavedSchedule: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  savedSchedule,
  setSavedSchedule,
  setOpen,
}) => {
  const dispatch = useAppDispatch();

  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleEdit = (id: string) => {
    dispatch(setScheduleId(id));
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSchedule(id).unwrap();
      setSavedSchedule(prev => prev.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Помилка при видаленні:', error);
    }
  };

  return (
    <div>
      <List>
        {savedSchedule.map((entry, index) => (
          <ListItem key={index}>
            <TitleAndButtons>
              <TimeAndDateStyle>
                <div>
                  <span>{entry.weekday},</span>
                  <span>
                    {entry.monthShort}
                    {format(new Date(entry.day), 'dd')}
                  </span>
                </div>
                <AccentSpan>
                  {entry.begin} - {entry.end}
                </AccentSpan>
              </TimeAndDateStyle>
              <ButtonsContainer>
                <button onClick={() => handleEdit(entry._id ?? '')}>
                  <Icon name={IconName.EDIT} width="20px" />
                  <ButtonsHiddenText>Edit</ButtonsHiddenText>
                </button>
                <button onClick={() => handleDelete(entry._id ?? '')}>
                  <Icon name={IconName.DELETE} width="20px" />{' '}
                  <ButtonsHiddenText>Delete</ButtonsHiddenText>
                </button>
              </ButtonsContainer>
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
        ))}
      </List>
    </div>
  );
};

export default ScheduleCard;
