import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/office-man.png";
const Navbar = () => {
  return (
    <nav className="navContainer">
      <div className="navLeft">
        <Link to="/">
          <h1>Event Dashboard</h1>
        </Link>
      </div>

      <div className="navCenter">
        <input
          type="text"
          placeholder="Search Your Products"
          className="navSearch"
        />
        <button type="submit" className="btn">
          SEARCH
        </button>
      </div>

      <div className="navRight">
        <Link to="/login">
          <div className="navUser">
            <img src={Avatar} alt="cart" className="cartImg" />
            <p>Brock</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
