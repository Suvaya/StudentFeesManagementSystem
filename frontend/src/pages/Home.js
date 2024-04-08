import React from "react";
import "../App.css"
import sms from "../images/sms.png"; 
import { useAuth } from "../contexts/AuthContext"; // Ensure the path is accurate for your project structure
import { Link } from "react-router-dom";


const Home = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from the AuthContext
  
    // If user is logged in, don't display the header
    if (isLoggedIn) {
      return null;
    }
  return (
    <div className="landing-page">
      <div className="content-box">
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/signin">Sign In</Link>
        </div>
        <div className="content">
          <div className="fix">
            <mark>
              <h1>
                <br />
                <br />
                Welcome <br />
                To <br />
                Student Management System
              </h1>
              <br />
            </mark>
            <div className="btns">
            <Link to="/signin" className="learn-more"><button className="learn-more">Login</button></Link>
            </div>
          </div>
          <div>
            <img src={sms} alt="Student Management System" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home