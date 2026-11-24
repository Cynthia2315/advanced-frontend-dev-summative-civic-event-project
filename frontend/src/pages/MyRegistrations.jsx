
import { useEffect, useState } from "react";
import api from "../api/api";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get(
        "/api/event-registrations/my-registrations"
      );

      setRegistrations(response.data.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load registrations");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (eventId) => {
    try {
      await api.post("/api/event-registrations/cancel", {
        event_id: eventId
      });

      alert("Registration cancelled!");
      fetchRegistrations();
    } catch (error) {
      console.log(error);
      alert("Failed to cancel registration");
    }
  };

  return (
    <div>
      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <p>You have no registrations.</p>
      ) : (
        registrations.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>Location: {item.location}</p>
            <p>Start: {new Date(item.starts_at).toLocaleString()}</p>
            <p>Status: {item.status}</p>

            {item.status === "registered" && (
              <button onClick={() => handleCancel(item.event_id)}>
                Cancel Registration
              </button>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;
