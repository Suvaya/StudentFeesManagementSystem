import React, { useState } from "react";
import "../Sidebar.css";
import { Link } from "react-router-dom"; // Import Link from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
  const { isLoggedIn, logout, role } = useAuth();
  const [isClosed, setIsClosed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Define navigation links based on roles
  const roleLinks = {
    admin: [
      { to: "/users", label: "Users" },
      { to: "/teachers", label: "Teachers" },
      { to: "/people", label: "People" },
      { to: "/add-user", label: "Add User" },
    ],
    teacher: [
      {to: "/teachinfo", label: "Profile" },
      { to: "/students", label: "Students" },
    ],
    student: [{ to: "/studinfo", label: "Profile" }],
  };

  // const toggleSidebar = () => setIsClosed(!isClosed);

  if (!isLoggedIn) {
    return null;
  }

  // Function to render links based on role
  const renderLinks = (links) =>
    links.map((link, index) => (
      <li className="nav-link" key={index}>
        <Link to={link.to}>
          <i className={`bx bx-chevron-right icon`}></i>
          <span className="text nav-text">{link.label}</span>
        </Link>
      </li>
    ));

  return (
    <div
      className={`sidebar ${isClosed ? "close" : ""} ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <header>{/* header content */}</header>

      <div className="menu-bar">
        <div className="menu">
          {/* Other links */}
          <ul className="menu-links">
            {/* Dynamically render role-based links */}
            {roleLinks[role] && renderLinks(roleLinks[role])}
          </ul>
        </div>

        <div className="bottom-content">
          <li>
            <a href="#" onClick={logout}>
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>

          {/* <li className="mode" onClick={toggleTheme}> */}
            {/* <div className="sun-moon">
              <i
                // className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"} icon`}
              ></i>
            </div> */}
            {/* <span className="mode-text text"> */}
              {/* {theme === "dark" ? "Light Mode" : "Dark Mode"} */}
            {/* </span> */}

            {/* <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
