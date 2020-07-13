import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
// import ShoppingAPI from "../../api/ShoppingAPI";

export default class ReportNavigation extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      groupRows: [],
      groupIndex: -1,
      retailerRows: [],
      retailerIndex: -1,
      retailerActive: false,
    };
  }

  //Group Functions
  async fetchGroups() {
    const res = await fetch("http://desktop-du328lq:8081/api/iKauf/groups");
    const resjson = await res.json();
    this.setState({ groupRows: resjson });
    console.log(resjson);
  }

  groupClickHandler(group) {
    this.setState({ groupIndex: group.id });
    console.log(`Selected: ${group.name} with index of ${group.id}`);
  }

  // Retailer Functions
  async fetchRetailers() {
    const res = await fetch("http://desktop-du328lq:8081/api/iKauf/entries");
    const resjson = await res.json();
    this.setState({ retailerRows: resjson });
    console.log(resjson);
  }

  retailerToggleHandler() {
    this.state.retailerIndex = -1;
    this.setState({ retailerActive: !this.state.retailerActive });
  }
  retailerClickHandler(retailer) {
    if (this.state.retailerActive) {
      this.setState({ retailerIndex: retailer.id });
      console.log(`Selected: ${retailer.name} with index of ${retailer.id}`);
    }
  }

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.fetchGroups();
    this.fetchRetailers();
    console.log("All Callbacks initialised");
  };

  render() {
    const groupRows = this.state.groupRows;
    const retailerRows = this.state.retailerRows;
    return (
      <TableContainer
        style={{ width: Math.round(window.innerWidth * 0.3) }}
        component={Paper}
      >
        {/* Group Table */}
        <Table
          size="small"
          aria-label="spanning table"
          style={{ height: Math.round(window.innerHeight * 0.3) }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
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
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Retailer Table */}
        <Table
          size="small"
          aria-label="spanning table"
          state="Disable"
          style={{
            backgroundColor: this.state.retailerActive ? "white" : "grey",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Select Retailer:</b>
              </TableCell>
              <TableCell>
                <Button
                  style={{ backgroundColor: "lightblue" }}
                  onClick={this.retailerToggleHandler.bind(this)}
                >
                  Disable Filter
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {retailerRows.map((row) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor:
                    row.id === this.state.retailerIndex ? "#0090FF" : "white" | 
                    this.state.retailerActive ? "white" : "grey",
                  }}
                onClick={this.retailerClickHandler.bind(this, row)}
              >
                <TableCell colSpan={2}>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
