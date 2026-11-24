
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>CivicEvents+</h2>

      <Link to="/dashboard">Dashboard</Link>
      {" | "}

      <Link to="/events">Events</Link>
      {" | "}

      <Link to="/my-registrations">My Registrations</Link>
      {" | "}

      <Link to="/announcements">Announcements</Link>
      {" | "}

      <Link to="/notifications">Notifications</Link>
      {" | "}

      <Link to="/promos">Promotional Videos</Link>
    </nav>
  );
}

export default Navbar;
