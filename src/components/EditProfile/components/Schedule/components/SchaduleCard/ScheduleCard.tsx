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

interface Profile {
  avatar?: string;
  firstName: string;
  lastName: string;
}

interface ScheduleEntry {
  day: Date | string;
  begin: string;
  end: string;
  profile: Profile;
  weekday: string;
  monthShort: string;
}

export interface ScheduleCardProps {
  savedSchedule: ScheduleEntry[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ savedSchedule }) => {
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
                <button>
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
