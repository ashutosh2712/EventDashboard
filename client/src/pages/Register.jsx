import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/auth/register`, {
        username,
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        console.log("User registered:", response.data);
      }
      navigate("/");
    } catch (error) {
      console.log("Error registerin user:", error);
      const errorMessage = "*User already exist!";

      setError(errorMessage);
    }
  };
  return (
    <div className="authContainer">
      <h2 className="hackerFont">Register</h2>
      {error && (
        <p className="hackerFont" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form className="authFormContainer" onSubmit={handleRegister}>
        <label htmlFor="username">
          <b className="hackerFont">Username</b>
        </label>
        <input
          type="text"
          value={username}
          placeholder="Enter username"
          className="formInput"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">
          <b className="hackerFont">Email Address</b>
        </label>
        <input
          type="email"
          value={email}
          placeholder="Enter your Email"
          className="formInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          <b className="hackerFont">Password</b>
        </label>
        <input
          type="password"
          value={password}
          placeholder="Enter your Password"
          className="formInput"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-cart">
          Register
        </button>
      </form>

      <p className="hackerFont">
        Already have an account ?{" "}
        <Link to="/login" className="ToogleLink">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
