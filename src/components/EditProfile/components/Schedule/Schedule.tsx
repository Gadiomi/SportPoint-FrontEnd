declare module 'react-big-calendar';

import React, { useState } from 'react';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { momentLocalizer, View, EventProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import schedule from '../../data/schedule.json';
import {
  ButtonList,
  ButtonListItem,
  ScheduleContainer,
  StyledCalendar,
  ToolbarContainer,
} from './Schedule.styled';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const CustomWeekHeader = ({ date }: { date: Date }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <span>{moment(date).format('dd')}</span> {/* Скорочена назва дня тижня */}
      <span>{moment(date).format('DD')}</span> {/* Число */}
    </div>
  );
};

const CustomWeekEvent: React.FC<EventProps<Event>> = ({ event }) => {
  return (
    <div style={{ padding: '5px', textAlign: 'center' }}>
      <strong>{event.title}</strong>
    </div>
  );
};

const Schedule = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState<Date>(new Date());

  const events: Event[] = [
    {
      title: 'Приклад події',
      start: new Date(),
      end: new Date(),
    },
  ];

  const CustomToolbar = ({
    onNavigate,
    onView,
  }: {
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY', date?: Date) => void;
    onView: (view: View) => void;
  }) => (
    <ToolbarContainer>
      <div>
        <Button
          testId="navigate-back"
          title="Назад"
          appearance={ButtonAppearance.SECONDARY}
          onClick={() => onNavigate('PREV')}
        />
        <Button
          testId="navigate-next"
          title="Вперед"
          appearance={ButtonAppearance.SECONDARY}
          onClick={() => onNavigate('NEXT')}
        />
      </div>

      <ButtonList>
        {Object.entries(schedule.buttons).map(([key, value], index) => (
          <ButtonListItem key={index}>
            <Button
              testId={`schedule-${key}`}
              type="button"
              title={value}
              onClick={() => {
                if (key === 'today') {
                  onNavigate('TODAY');
                  onView('day');
                } else if (key === 'week') {
                  onView('week');
                } else if (key === 'month') {
                  onView('month');
                }
              }}
            />
          </ButtonListItem>
        ))}
      </ButtonList>
    </ToolbarContainer>
  );

  return (
    <ScheduleContainer>
      <Button
        onClick={() => navigate('/profile')}
        title="РОЗКЛАД РОБОТИ"
        appearance={ButtonAppearance.PRIMARY}
        testId="general"
        style={{ width: '100%', padding: '8px 18px' }}
        appendChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.ARROW_LEFT}
          />
        }
        prependChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.ACCOUNT}
          />
        }
      />

      <StyledCalendar
        localizer={localizer}
        // events={events}
        startAccessor={event => event.start}
        endAccessor={event => event.end}
        defaultDate={new Date()}
        date={date}
        onNavigate={(newDate: Date) => setDate(newDate)}
        view={view}
        onView={(newView: View) => setView(newView)}
        components={{
          toolbar: CustomToolbar,
          week: {
            header: CustomWeekHeader,
          },
        }}
      />
    </ScheduleContainer>
  );
};

export default Schedule;
