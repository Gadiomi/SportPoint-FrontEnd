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

export interface ScheduleCardProps {
  savedSchedule: ScheduleEntry[];
  setSavedSchedule: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  savedSchedule,
  setSavedSchedule,
}) => {
  const [deleteSchedule] = useDeleteScheduleMutation();

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
                <button>
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
              <img src={entry.profile.avatar} alt="avatar" />

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
