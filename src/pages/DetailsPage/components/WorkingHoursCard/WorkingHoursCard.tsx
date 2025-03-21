import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  StyledWorkingHoursCard,
  IconContainer,
  Title,
  WorkingHoursContainer,
  WorkingHoursDiv,
  WorkingHoursDays,
  WorkingHoursHours,
} from './styles';

interface Schedule {
  days: string;
  hours: string;
}

interface WorkingHoursCardProps {
  schedules: Schedule[];
}

const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({ schedules }) => {
  const { t } = useTranslation();
  return (
    <StyledWorkingHoursCard>
      <IconContainer>
        <Icon
          name={IconName.ARROW_RIGHT}
          styles={{
            left: '12px',
            fill: 'none',
            width: '32px',
            height: '32px',
          }}
        />
        <Title>{t('details_page.working_hours')}</Title>
      </IconContainer>
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
