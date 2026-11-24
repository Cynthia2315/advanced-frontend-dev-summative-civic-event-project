

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

function Admin() {
  const { user } = useContext(AuthContext);

  // Event form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [starts_at, setStartsAt] = useState("");
  const [ends_at, setEndsAt] = useState("");

  // Announcement form
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementAudio, setAnnouncementAudio] = useState(null);
  // Promotional video form
  const [promoTitle, setPromoTitle] = useState("");
  const [promoDescription, setPromoDescription] = useState("");
  const [promoCaption, setPromoCaption] = useState("");
  const [promoVideo, setPromoVideo] = useState(null);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/api/events", {
      title,
      description,
      location,
      starts_at,
      ends_at
    });

    alert("Event created successfully!");

    setTitle("");
    setDescription("");
    setLocation("");
    setStartsAt("");
    setEndsAt("");
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to create event");
  }
};

  const handleAnnouncement = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", announcementTitle);
    formData.append("published", "true");
    formData.append("audio", announcementAudio);

    await api.post("/api/announcements", formData);

    alert("Announcement created successfully!");

    setAnnouncementTitle("");
    setAnnouncementAudio(null);
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to create announcement");
  }
};
const handlePromo = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", promoTitle);
    formData.append("description", promoDescription);
    formData.append("caption_text", promoCaption);
    formData.append("video", promoVideo);

    await api.post("/api/promos", formData);

    alert("Promotional video uploaded successfully!");

    setPromoTitle("");
    setPromoDescription("");
    setPromoCaption("");
    setPromoVideo(null);
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to upload video");
  }
};
  if (!user || user.role !== "admin") {




    return <h1>Access denied. Admins only.</h1>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user.full_name}</p>

      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event title" value={title}
          onChange={(e) => setTitle(e.target.value)} required />

        <br /><br />

        <textarea placeholder="Event description" value={description}
          onChange={(e) => setDescription(e.target.value)} required />

        <br /><br />

        <input type="text" placeholder="Event location" value={location}
          onChange={(e) => setLocation(e.target.value)} required />

        <br /><br />

        <label>Start date and time</label>
        <input type="datetime-local" value={starts_at}
          onChange={(e) => setStartsAt(e.target.value)} required />

        <br /><br />

        <label>End date and time</label>
        <input type="datetime-local" value={ends_at}
          onChange={(e) => setEndsAt(e.target.value)} required />

        <br /><br />

        <button type="submit">Create Event</button>
      </form>

      <hr />

      <h2>Create Announcement</h2>
      <hr />
      <p>TEST: Announcement section</p>

      <form onSubmit={handleAnnouncement}>
  <input
    type="text"
    placeholder="Announcement title"
    value={announcementTitle}
    onChange={(e) => setAnnouncementTitle(e.target.value)}
    required
  />

  <br /><br />

  <label>Upload audio file</label>
  <input
    type="file"
    accept="audio/*"
    onChange={(e) => setAnnouncementAudio(e.target.files[0])}
    required
  />

  <br /><br />

  <button type="submit">Publish Announcement</button>
</form>


<hr />

<h2>Create Promotional Video</h2>

<form onSubmit={handlePromo}>
  <input
    type="text"
    placeholder="Video title"
    value={promoTitle}
    onChange={(e) => setPromoTitle(e.target.value)}
    required
  />

  <br /><br />

  <textarea
    placeholder="Video description"
    value={promoDescription}
    onChange={(e) => setPromoDescription(e.target.value)}
    required
  />

  <br /><br />

  <textarea
    placeholder="Video captions"
    value={promoCaption}
    onChange={(e) => setPromoCaption(e.target.value)}
    required
  />

  <br /><br />

  <label>Upload promotional video</label>
  <input
    type="file"
    accept="video/*"
    onChange={(e) => setPromoVideo(e.target.files[0])}
    required
  />

  <br /><br />

  <button type="submit">Upload Promotional Video</button>
</form>

    </div>
  );
}

export default Admin;
