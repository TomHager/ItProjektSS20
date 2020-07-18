import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // IconButton,
} from "@material-ui/core";
// import ShoppingAPI from "../../api/ShoppingAPI";
import DeleteRetailerAlert from "../dialogs/DeleteRetailerAlert";
import AddRetailer from "../subcomponents/AddRetailer";

/**
 *
 * @author Robin Fink
 */

export default class RetailerList extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      retailerRows: [],
      retailerIndex: -1,
      retailers: [],
    };
  }

  //Retailer Functions
  async fetchRetailer() {
    const res = await fetch("http://DESKTOP-NM4VM89:8081/api/iKauf/retailer");
    const resjson = await res.json();
    this.setState({ retailerRows: resjson });
    console.log(resjson);
  }

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.fetchRetailer();
    console.log("All Callbacks initialised");
  };

  delRetailer = (id) => {
    this.setState({
      retailers: [
        ...this.state.retailers.filter((retailer) => retailer.id !== id),
      ],
    });
  };

  addRetailer = (name) => {
    const newRetailer = {
      id: 4,
      name,
    };
    this.setState({ retailers: [...this.state.retailers, newRetailer] });

    console.log(`add Retailer ${this.state.retailers}`);
  };

  render() {
    const retailers = this.state.retailers;
    return (
      <div align="center">
        <TableContainer
          style={{ width: Math.round(window.innerWidth * 0.3), margin: "3em" }}
          component={Paper}
        >
          {/* Retailer Table */}
          <Table
            size="small"
            aria-label="spanning table"
            // style={{ height: Math.round(window.innerHeight * 0.3) }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Retailer:</b>
                </TableCell>
                <TableCell>
                  <AddRetailer addRetailer={this.addRetailer}></AddRetailer>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {retailers.map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.id === this.state.groupIndex ? "#0090FF" : "white",
                  }}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <DeleteRetailerAlert delRetailer={this.delRetailer} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
