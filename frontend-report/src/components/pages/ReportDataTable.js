import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import EntryBO from '../../api/EntryBO';
import GroupBO from '../../api/GroupBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import UserBO from '../../api/UserBO';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Button,
} from '@material-ui/core';

/**
 * Displays the data table for the report generator
 *
 * @author Lukas Rutkauskas
 */

export default class ReportDataTable extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      entryRows: [],
      entryIndex: -1,
      name: '',
      email: '',
      users: [],
      filteredUsers: [],
      loadingInProgress: false,
      error: null,
      user: null,
      GroupmemberShip: null,
      retailers: null,
      favorite: null,
      lists: null,
    };
  }

  async fetchEntries() {
    const res = await fetch('http://DESKTOP-DU328LQ:8081/api/iKauf/entries');
    const resjson = await res.json();
    this.setState({ entryRows: resjson });
    this.calculateSumOfAmount.bind(this);
    console.log(this.state.entryRows);
  }

  componentDidMount = () => {
    this.fetchEntries();
  };

  calculateSumOfAmount() {
    var o = {};
    const a = this.state.entryRows;

    a.forEach((i) => {
      var name = i.name;
      i.amount = parseInt(i.amount);
      if (!o[name]) {
        return (o[name] = i);
      }
      return (o[name].amount = o[name].amount + i.amount);
    });

    console.log(o);
    var a2 = [];
    Object.keys(o).forEach((key) => {
      a2.push(o[key]);
    });
    this.setState({ entryRows: a2 });
    console.log(a2);
  }

  render() {
    const entryRows = this.state.entryRows;
    return (
      <TableContainer
        style={{
          width: Math.round(window.innerWidth * 0.68),
          marginLeft: '2em',
        }}
        component={Paper}
      >
        {/* Group Table */}
        <Table
          size="small"
          aria-label="spanning table"
          style={{
            height: Math.round(window.innerHeight * 0.23),
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Articles bought in this time period</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {entryRows.map((row) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor: row.id === this.state.groupIndex ? '#0090FF' : 'white',
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

