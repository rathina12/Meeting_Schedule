export async function checkBackendHealth() {
  const res = await fetch("http://localhost:8080/api/health");
  return res.text();
}

