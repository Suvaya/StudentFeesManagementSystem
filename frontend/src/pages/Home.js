import React from "react";
import "../App.css"
import sms from "../images/sms.png"; 
// import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="landing-page">
        <div className="content">
            <div>
              <mark><h1><br/><br/><br/><br/>Welcome <br/>To <br/>Student Management System</h1><br/></mark>
              <div class="btns">
                {/* <Link to="/signin">
                  <button class="learn-more">Login</button>
                </Link> */}
              </div>
            </div>
            <div>
                <img src={sms} alt="people"/>
            </div>
        </div>
    </div>
  )
}

export default Home