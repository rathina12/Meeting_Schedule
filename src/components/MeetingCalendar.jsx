import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import { getMeetings } from '../services/meetingService';
import { format, parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(), 
  getDay: date => date.getDay(),
  locales,
});

export default function MeetingCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getMeetings().then((meetings) => {
      const formattedEvents = meetings.map((m) => ({
        id: m.id,
        title: m.title,
        start: new Date(m.startTime),
        end: new Date(m.endTime),
      }));
      setEvents(formattedEvents);
    });
  }, []);

  return (
    <div style={{ height: 500, margin: "2rem 0" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
