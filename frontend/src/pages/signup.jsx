import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSignup = async (e) => {
    e.preventDefault();


    if (form.password !== form.confirm_password) {
      alert("Passwords do not match");
      return;
    }


    try {

     await api.post("/api/auth/signup", {
        full_name: form.full_name,
        email: form.email,
        password: form.password
      });


      alert("Account created successfully!");

      navigate("/login");


    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error.response?.data || error.message
      );


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return (
    <div>

      <h1>Create Account</h1>


      <form onSubmit={handleSignup}>


        <div>
          <label>Full Name</label>
          <br />

          <input
            name="full_name"
            placeholder="Enter full name"
            value={form.full_name}
            onChange={handleChange}
          />

        </div>


        <br />


        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

        </div>


        <br />


        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

        </div>


        <br />


        <div>
          <label>Confirm Password</label>
          <br />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            value={form.confirm_password}
            onChange={handleChange}
          />

        </div>


        <br />


        <button type="submit">
          Sign Up
        </button>


      </form>


    </div>
  );
}


export default Signup;