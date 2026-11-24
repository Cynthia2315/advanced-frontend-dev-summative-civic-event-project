
import { useEffect, useState } from "react";
import api from "../api/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await api.get("/api/notifications");
        setNotifications(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id}>
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <small>
              {new Date(notification.created_at).toLocaleString()}
            </small>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;
