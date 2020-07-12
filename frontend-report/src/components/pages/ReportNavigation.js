import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
// import ShoppingAPI from "../../api/ShoppingAPI";

export default class ReportNavigation extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      groupRows: [],
      groupIndex: -1,
    };
  }

  async fetchGroups() {
    const res = await fetch("http://desktop-du328lq:8081/api/iKauf/groups");
    const resjson = await res.json();
    this.setState({ groupRows: resjson });
  }

  componentDidMount = () => {
    this.fetchGroups();
    console.log("TEST");
  };

  groupClickHandler(group) {
    this.setState({ groupIndex: group.id });
    console.log(`${group.name} has index of ${this.state.groupIndex}`);
  }

  render() {
    const groupRows = this.state.groupRows;
    return (
      <TableContainer style={{width: Math.round(window.innerWidth * 0.3)}} component={Paper}>
        <Table
          size="small"
          aria-label="spanning table"
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <b>Select Group:</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {groupRows.map((row) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor:
                    row.id === this.state.groupIndex ? "#0090FF" : "white",
                }}
                onClick={this.groupClickHandler.bind(this, row)}
              >
                <TableCell
                  style={{ maxWidth: 100 }}
                  value={row}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
