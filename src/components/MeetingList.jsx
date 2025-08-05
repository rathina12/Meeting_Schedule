import { useState } from "react";
import { deleteMeeting } from "../services/meetingService";
import MeetingForm from "./MeetingForm";

export default function MeetingList({ meetings, onDelete, onRefresh }) {
  const [editingMeetingId, setEditingMeetingId] = useState(null);

  async function handleDelete(id) {
    const confirm = window.confirm("Are you sure you want to delete this meeting?");
    if (!confirm) return;

    try {
      await deleteMeeting(id);
      alert("Meeting deleted successfully!");
      if (onDelete) onDelete();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete meeting");
    }
  }

  const handleEdit = (id) => {
    setEditingMeetingId(id);
  };

  const handleEditDone = () => {
    setEditingMeetingId(null);
    if (onRefresh) onRefresh();
  };

  return (
    <div>
      <h2>Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {meetings.map((m) => (
            <li key={m.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
              {editingMeetingId === m.id ? (
                <MeetingForm
                  mode="edit"
                  meetingId={m.id}
                  initialData={{
                    title: m.title,
                    organizer: m.organizer,
                    participants: m.participants,
                    startTime: m.startTime,
                    endTime: m.endTime,
                    location: m.location,
                  }}
                  onSuccess={handleEditDone}
                />
              ) : (
                <>
                  <strong>{m.title}</strong> by {m.organizer}<br />
                  🧑 Participants: {m.participants}<br />
                  🕒 {new Date(m.startTime).toLocaleString()} → {new Date(m.endTime).toLocaleString()}<br />
                  📍 {m.location}<br />

                  <button
                    onClick={() => handleEdit(m.id)}
                    style={{ marginTop: "0.5rem", marginRight: "0.5rem", padding: "0.3rem 0.7rem", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    style={{ marginTop: "0.5rem", padding: "0.3rem 0.7rem", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "4px" }}
                  >
                    ❌ Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
