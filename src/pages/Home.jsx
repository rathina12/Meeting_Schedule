import { useEffect, useState } from "react";
import { checkBackendHealth } from "../services/healthService";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkBackendHealth().then(setStatus).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Welcome to Meeting Scheduler</h2>
      <p>Backend Status: {status}</p>
    </div>
  );
}
