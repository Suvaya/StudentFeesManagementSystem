import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search here... "/>
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon/>
          </div>
          <div className="item">
            <SettingsOutlinedIcon/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar