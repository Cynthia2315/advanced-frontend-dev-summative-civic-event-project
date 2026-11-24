
import { useEffect, useState } from "react";
import api from "../api/api";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const response = await api.get("/api/announcements");
        setAnnouncements(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAnnouncements();
  }, []);

  return (
    <div>
      <h1>Announcements</h1>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        announcements.map((announcement) => (
          <div key={announcement.id}>
            <h3>{announcement.title}</h3>

            {announcement.audio_url && (
              <audio controls src={announcement.audio_url}>
                Your browser does not support audio.
              </audio>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Announcements;
