declare module 'react-big-calendar';

import React, { useState } from 'react';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import schedule from '../../data/schedule.json';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [date, setDate] = useState<Date>(new Date());

  const handleViewChange = (newView: 'day' | 'week' | 'month') => {
    setView(newView);
  };

  const events = [
    {
      title: 'Приклад події',
      start: new Date(),
      end: new Date(),
    },
  ];

  return (
    <div>
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

      <ul>
        {Object.entries(schedule.buttons).map(([key, value], index) => (
          <li key={index}>
            <Button
              testId={`schedule-${key}`}
              type="button"
              title={value}
              onClick={() => handleViewChange(key as 'day' | 'week' | 'month')}
            />
          </li>
        ))}
      </ul>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        date={date}
        onNavigate={newDate => setDate(newDate)}
        view={view}
        onView={newView => setView(newView as 'day' | 'week' | 'month')}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Schedule;
