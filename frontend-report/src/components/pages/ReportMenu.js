import React, { useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
// import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import ShoppingAPI from "../../api/ShoppingAPI";

const useStyles = makeStyles({
  root: {
    width: Math.round(window.innerWidth * 0.3),
  },
  table: {
    minWidth: 200,
  },
});


function writeGroups() {
  const groups=[];
  for (let i = 0; i < fetchGroups.length; i++) {
    
    groups.push(createRow(fetchGroups[i]));
  };
  console.log(groups);
  return groups;
}
// const groupRows= writeGroups();

function createRow(group) {
  return { group };
}

// TODO: Just fetch Group by User without createRow
const groupRows = [
  createRow("Paperclips (Box)"),
  createRow("Paper (Case)"),
  createRow("Wates Basket"),
];

async function fetchGroups() {
  const res = await fetch("http://desktop-du328lq:8081/api/iKauf/groups");
  const resjson = await res.json();
  // this.setState({ data: resjson });
  // console.log({ data: resjson });
  return {data:resjson};
}

const componentDidMount = () => {
  writeGroups();
  console.log("TEST");
}

export default function ReportMenu() {
  const classes = useStyles();
  return (
    componentDidMount(),
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size="small" aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <b>Select Group:</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupRows.map((row) => (
            <TableRow key={row.group}>
              <TableCell>
                <input
                  type="radio"
                  name="radioButton"
                  // value={result.radioButton}
                  // checked={console.log(row.group)}
                />
              </TableCell>
              <TableCell style={{ maxWidth: 100 }} align="left">
                {row.group}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
