import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../assets/office-man.png";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const initialAuthState = !!token;
  const initialUsername = token ? jwtDecode(token).username : "";
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
  const [username, setUsername] = useState(initialUsername);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      setUsername(jwtDecode(token).username);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        {isAuthenticated ? (
          <div className="navUserInfo">
            <div className="navUser">
              <img src={Avatar} alt="cart" className="cartImg" />
              <span>{username}</span>
            </div>

            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="navUser">
            <img src={Avatar} alt="cart" className="cartImg" />
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
