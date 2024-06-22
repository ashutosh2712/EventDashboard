import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="authContainer">
      <h2 className="hackerFont">Login</h2>
      <form className="authFormContainer">
        <label htmlFor="email">
          <b className="hackerFont">Email Address</b>
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          className="formInput"
        />
        <label htmlFor="password">
          <b className="hackerFont">Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="formInput"
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
