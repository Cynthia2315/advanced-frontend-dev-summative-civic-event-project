import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import MyRegistrations from "./pages/MyRegistrations";
import Promos from "./pages/Promos";


function App() {

  return (

    <>
      <Navbar />

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/events" element={<Events />} />

        <Route path="/announcements" element={<Announcements />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/my-registrations" element={<MyRegistrations />} />

        <Route path="/promos" element={<Promos />} />

      </Routes>

    </>

  );
}

export default App;