import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="authContainer">
      <h2 className="hackerFont">Register</h2>
      <form className="authFormContainer">
        <label htmlFor="username">
          <b className="hackerFont">Username</b>
        </label>
        <input type="text" placeholder="Enter username" className="formInput" />

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
