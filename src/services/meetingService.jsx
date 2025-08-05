const BASE_URL = "http://localhost:8080/api/meetings";

export async function createMeeting(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create meeting");
  return await res.json();
}

export async function getMeetings() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function deleteMeeting(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Server error:", errorText);
    throw new Error("Failed to delete meeting");
  }

  return true; 
}

export async function updateMeeting(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update meeting");
  return await res.json();
}


