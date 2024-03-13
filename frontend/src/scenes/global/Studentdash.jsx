import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactsOutLinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutLinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutLinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutLinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutLinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Item = ({ title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem 
      active={selected === title} 
      style={{ color: colors.primary[500]}} 
      onClick={() => setSelected(title)} 
      icon={icon}
    >
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  )
}

const Studentdash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .inner-item:hover": {
          color: "#868dfd !important",
        },
        "& .menu-item.active": {
          color: "#6870fa !important",
        },
      }}>

<Sidebar collapsed={isCollapsed} style={{ background: `${colors.primary[400]} !important`, zIndex: 1000 }}>
        <Menu iconShape="square">
          {/* {LOGO and MENU ICON} */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOpenIcon /> : <MenuOutLinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.primary[500],
            }}
          >
            {!isCollapsed && (
              <Box 
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.primary[500]}>
                  ADMIN IS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {User} */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img 
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`} //LOGO img location
                  style={{ cursor: "pointer", borderRadius:"50%"}}
                />
              </Box>
              <Box textAlign="center">
                <Typography 
                  variant="h2" 
                  color={colors.primary[500]} 
                  fontWeight="bold" 
                  sx={{ m: "10px 0 0 0"}}>Alish
                </Typography>
                <Typography
                  variant="h5" 
                  color={colors.redAccent[500]} 
                  >Bsc. CSIT
                </Typography>
              </Box>
            </Box>
          )}
          {/* {Menu} */}
          <Box paddingLeft={isCollapsed ? undefined: "10px"}>
            <Item 
              title="Dashboard"
              to="/"
              icon={<HomeOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography 
              variant="h6"
              color={colors.primary[600]}
              sx={{m: "15px 0 5px 20px"}}>
              Data
            </Typography>

            <Item 
              title="Marks"
              to="/marks"
              icon={<SupervisorAccountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title="Teacher"
              to="/teacher"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title="Fees"
              to="/invoices"
              icon={<ReceiptOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography 
              variant="h6"
              color={colors.primary[600]}
              sx={{m: "15px 0 5px 20px"}}>
              Pages
            </Typography>
            <Item 
              title="Log Out"
              to="/"
              icon={<PersonOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title="Help"
              to="/help"
              icon={<HelpOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default Studentdash;