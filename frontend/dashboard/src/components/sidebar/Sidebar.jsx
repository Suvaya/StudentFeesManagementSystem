import React from "react";
import logo from "../../images/logo.jpeg"; // Adjust the path as needed
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Assessment1OutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <img src={logo} alt="logo" />
        </span>
        <h2><span className="name">Topwin Traders</span></h2>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon"/>
            <span className="space">Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <li>
            <AssignmentOutlinedIcon className="icon"/>
            <span className="space">Task</span>
          </li>
          <li>
            <Assessment1OutlinedIcon className="icon"/>
            <span className="space">Activities</span>
          </li>
          <li>
            <EmailOutlinedIcon className="icon"/>
            <span className="space">Messages</span>
          </li>
          <li>
            <CalendarMonthOutlinedIcon className="icon"/>
            <span className="space">Celendar</span>
          </li>
          <p className="title">USER</p>
          <li>
            <LogoutOutlinedIcon className="icon"/>
            <span className="space">Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar