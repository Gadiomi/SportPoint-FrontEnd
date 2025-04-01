import React from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
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
  const theme = useTheme();
  return (
    <StyledWorkingHoursCard>
      <TitleContainer titleKey="details_page.working_hours" />
      <WorkingHoursContainer>
        {schedules.map(schedule => (
          <WorkingHoursDiv key={schedule.days}>
            <WorkingHoursDays style={fonts.priceName}>
              {schedule.days}
            </WorkingHoursDays>
            <WorkingHoursHours
              style={{ ...fonts.priceName, color: theme.color.secWhite }}
            >
              {schedule.hours}
            </WorkingHoursHours>
          </WorkingHoursDiv>
        ))}
      </WorkingHoursContainer>
    </StyledWorkingHoursCard>
  );
};

export default WorkingHoursCard;
