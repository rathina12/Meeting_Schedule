import { useState, useEffect } from "react";
import { createMeeting, updateMeeting } from "../services/meetingService";
import { jwtDecode } from "jwt-decode";


export default function MeetingForm({ onSuccess, initialData = null, mode = "create", meetingId = null }) {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    participants: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("googleToken");
const decoded = token ? jwtDecode(token) : null;


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "edit" && meetingId) {
        await updateMeeting(meetingId, formData);
        setSuccess("Meeting updated successfully!");
      } else {
        await createMeeting(formData);
        setSuccess("Meeting created successfully!");

        if (token) {
          const event = {
            summary: formData.title,
            description: `Organized by: ${formData.organizer}\nParticipants: ${formData.participants}`,
            start: {
              dateTime: new Date(formData.startTime).toISOString(),
              timeZone: "Asia/Kolkata"
            },
            end: {
              dateTime: new Date(formData.endTime).toISOString(),
              timeZone: "Asia/Kolkata"
            },
            location: formData.location,
            attendees: formData.participants
              .split(",")
              .map((email) => ({ email: email.trim() }))
          };

          await addToGoogleCalendar(event, token);
          console.log("Event added to Google Calendar");
        }
        setFormData({
          title: "",
          organizer: "",
          participants: "",
          startTime: "",
          endTime: "",
          location: "",
        });
      }

      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred.");
      setSuccess("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{mode === "edit" ? "Edit Meeting" : "Create Meeting"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="organizer" placeholder="Organizer" value={formData.organizer} onChange={handleChange} required />
        <input name="participants" placeholder="Participants (comma separated)" value={formData.participants} onChange={handleChange} required />
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <button
          type="submit"
          style={{
            backgroundColor: mode === "edit" ? "#2980b9" : "#2ecc71",
            color: "white",
            border: "none",
            padding: "0.5rem",
            borderRadius: "4px"
          }}
        >
          {mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
