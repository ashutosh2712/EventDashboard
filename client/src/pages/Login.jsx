import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      console.log("User LogedIn:", response.data);
    } catch (error) {
      console.log("Error registerin user:", error);
      const errorMessage = "*User id or password wrong!";

      setError(errorMessage);
    }
  };
  return (
    <div className="authContainer">
      <h2 className="hackerFont">Login</h2>
      {error && (
        <p className="hackerFont" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form className="authFormContainer" onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
      <p className="hackerFont">
        New User ?{" "}
        <Link to="/register" className="ToogleLink">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
