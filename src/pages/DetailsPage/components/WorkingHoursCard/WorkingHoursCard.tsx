import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import {
  StyledWorkingHoursCard,
  WorkingHoursContainer,
  WorkingHoursDiv,
  WorkingHoursDays,
  WorkingHoursHours,
} from './styles';

interface ScheduleItem {
  days: string;
  hours: string;
}

interface WorkingHoursCardProps {
  schedules: ScheduleItem[];
}

const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({ schedules }) => {
  return (
    <StyledWorkingHoursCard>
      <TitleContainer titleKey="details_page.working_hours" />
      <WorkingHoursContainer>
        {schedules.map(schedule => (
          <WorkingHoursDiv key={schedule.days}>
            <WorkingHoursDays>{schedule.days}</WorkingHoursDays>
            <WorkingHoursHours>{schedule.hours}</WorkingHoursHours>
          </WorkingHoursDiv>
        ))}
      </WorkingHoursContainer>
    </StyledWorkingHoursCard>
  );
};

export default WorkingHoursCard;
