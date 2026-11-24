

import { useEffect, useState } from "react";
import api from "../api/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events");
        console.log("Events received:", response.data);
        setEvents(response.data.data || []);
      } catch (error) {
        console.log(error);
        alert("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post("/api/event-registrations/register", {
        event_id: eventId
      });

      alert("Registered successfully!");
      setRegisteredEvents([...registeredEvents, eventId]);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleFeedback = async (e, eventId) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await api.post("/api/event-feedback", {
        event_id: eventId,
        rating: Number(formData.get("rating")),
        comment: formData.get("comment")
      });

      alert("Feedback submitted successfully!");
      e.target.reset();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Feedback failed");
    }
  };

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  return (
    <div>
      <h1>CivicEvents - Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>

            <button
              onClick={() => handleRegister(event.id)}
              disabled={registeredEvents.includes(event.id)}
            >
              {registeredEvents.includes(event.id)
                ? "Registered"
                : "Register for Event"}
            </button>

            <h3>Leave Feedback</h3>

            <form onSubmit={(e) => handleFeedback(e, event.id)}>
              <label>Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                required
              />

              <br /><br />

              <textarea
                name="comment"
                placeholder="Write your feedback"
                required
              />

              <br /><br />

              <button type="submit">Submit Feedback</button>
            </form>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Events;
