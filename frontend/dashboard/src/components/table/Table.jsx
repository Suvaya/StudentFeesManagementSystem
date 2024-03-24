import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./table.scss";

const List = () => {
  const rows = [
    {
      id: 1,
      teacher: "Sir Shrestha",
      subject: "E Commerce",
      mark: 65,
      action: "subject",
    },
    {
      id: 2,
      teacher: "Sir Tuladhar",
      subject: "Dot Net",
      mark: 55,
      action: "subject",
    },
    {
      id: 3,
      teacher: "Sir Shrestha",
      subject: "Technical Writing",
      mark: 60,
      action: "subject",
    },
    {
      id: 4,
      teacher: "Sir Tuladhar",
      subject: "E Governance",
      mark: 45,
      action: "subject",
    },
    {
      id: 5,
      teacher: "Sir Tuladhar",
      subject: "Software Engineering",
      mark: 75,
      action: "subject",
    },
  ]

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" align="center">S.N.</TableCell>
            <TableCell className="tableCell" align="center">Teacher</TableCell>
            <TableCell className="tableCell" align="center">Subject</TableCell>
            <TableCell className="tableCell" align="center">Marks</TableCell>
            <TableCell className="tableCell" align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell className="tableCell" align="center">{row.id}</TableCell>
              <TableCell className="tableCell" align="center">{row.teacher}</TableCell>
              <TableCell className="tableCell" align="center">{row.subject}</TableCell>
              <TableCell className="tableCell" align="center">{row.mark}</TableCell>
              <TableCell className="tableCell" align="center">{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List