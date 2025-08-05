import { useEffect, useState } from "react";
import { getMeetings } from "../services/meetingService";
import MeetingForm from "../components/MeetingForm";
import MeetingList from "../components/MeetingList";
import MeetingCalendar from "../components/MeetingCalendar";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);

  function loadMeetings() {
    getMeetings().then(setMeetings).catch(console.error);
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  return (
    <div>
      <h2>Meetings Dashboard</h2>

      <MeetingForm onSuccess={loadMeetings} />
      <MeetingList 
        meetings={meetings} 
        onDelete={loadMeetings} 
        onRefresh={loadMeetings}  
      />
      <MeetingCalendar />
    </div>
  );
}
