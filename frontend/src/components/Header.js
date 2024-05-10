import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure the path is accurate for your project structure

const Header = () => {
  const { isLoggedIn } = useAuth(); // Use only what's needed

  // If user is logged in, don't display the header
  if (isLoggedIn) {
    return null;
  }

  // Header content for logged out users
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;