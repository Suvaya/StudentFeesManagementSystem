import { Box, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import { DataTeam } from "../../data/Data";
import Header from "../../components/Header";

const Marks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID"}, 
    { field: "subject",
      headerName: "Subject", 
      flex: 1, 
      cellClassName: "name-column--cell",
    },
    { field: "mark",
      headerName: "Mark", 
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "grade",
      headerName: "Grade", 
      flex: 1, 
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title={"MARKS"} subtitle={"Viewing the Marks"}></Header>
      <Box
        m="40px 0 0 0"
        height="75wh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuidataGrid-root": {
            borderBottom: "none"
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300]
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400]
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700]
          }
        }}
      >
        <DataGrid
          rows={DataTeam}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Marks;