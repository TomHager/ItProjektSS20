import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@material-ui/core';
import ReportDataTable from './ReportDataTable';
import ShoppingAPI from '../../api/ShoppingAPI';
import firebase from 'firebase/app';

/**
 * Displays the Navigation for the report generator
 *
 * @author Tom Hager
 */

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
      timeActive: true,
      timeFrom: '',
      timeTo: '',
      submit: false,
    };
  }

  // Fetch groups for user
  async fetchGroups() {
    const groupRows = [];
    // Fetch current user
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((user) => {
        // Fetch all groupId by user
        ShoppingAPI.getAPI()
          .searchGroupsByMember(user[0].id)
          .then((groupMember) => {
            if (groupMember.length > 0) {
              // Fetch all groups
              ShoppingAPI.getAPI()
                .getGroups()
                .then((allGroups) => {
                  for (let i of groupMember)
                    groupRows.push(
                      allGroups.find((x) => x.id === i.group_membership)
                    );
                });
              // Else user has no groups
            } else {
              groupRows.push([{ id: 0, name: '404 not fround' }]);
            }
          });
      });
    this.setState({ groupRows });
  }

  // Fetch all retailer for given group
  fetchRetailers(groupId) {
    // Fetch all retailer for group
    ShoppingAPI.getAPI()
      .searchRetailerMemberByGroup(groupId)
      .then((membership) => {
        // Fetch all retailers of data warehouse
        ShoppingAPI.getAPI()
          .getRetailers()
          .then((allRetailers) => {
            const retailerRows = [];
            for (let i of membership) {
              retailerRows.push(
                allRetailers.find((x) => x.id === i.retailer_member)
              );
            }
            if (retailerRows.length === 0) {
              retailerRows.push({ id: 0, name: '404' });
            }
            // On success
            // setState before fetchfavorites because we need retailers in state
            this.setState({ retailerRows });
          });
      });
  }

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.fetchGroups();
  };

  groupClickHandler(group) {
    this.setState({ groupIndex: group.id, submit: false });
    this.fetchRetailers(group.id);
  }

  retailerToggleHandler() {
    this.setState({
      retailerIndex: -1,
      retailerActive: !this.state.retailerActive,
      submit: false,
    });
  }

  retailerClickHandler(retailer) {
    if (this.state.retailerActive) {
      this.setState({ retailerIndex: retailer.id, submit: false });
    }
  }

  timeToggleHandler() {
    console.log(this.state.timeTo);
    console.log(this.state.timeFrom);
    this.setState({
      timeFrom: '',
      timeTo: '',
      timeActive: !this.state.timeActive,
      submit: false,
    });
    document.getElementById('timeTo').value = '';
    document.getElementById('timeFrom').value = '';
  }

  submitClickHandler() {
    this.setState({ submit: true });
  }

  render() {
    const {
      groupRows,
      retailerRows,
      retailerActive,
      timeActive,
      timeFrom,
      timeTo,
      submit,
      groupIndex,
      retailerIndex,
    } = this.state;
    return (
      <TableContainer component={Paper}>
        {/* Group Table */}
        <Table size="small" aria-label="spanning table">
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
                    row.id === this.state.groupIndex ? '#C0C6F1' : 'white',
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
            backgroundColor: this.state.retailerActive ? 'white' : 'grey',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Select Retailer:</b>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  style={{ backgroundColor: '#C0C6F1', float: 'right' }}
                  onClick={this.retailerToggleHandler.bind(this)}
                >
                  {retailerActive ? 'Disable Filter' : 'Enable Fitler'}
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
                    row.id === this.state.retailerIndex
                      ? '#C0C6F1'
                      : 'white' | this.state.retailerActive
                      ? 'white'
                      : 'grey',
                }}
                onClick={this.retailerClickHandler.bind(this, row)}
              >
                <TableCell colSpan={2}>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Time Select */}
        <Table
          size="small"
          style={{
            backgroundColor: this.state.timeActive ? 'grey' : 'white',
          }}
        >
          <TableHead>
            <TableCell>Select Time Range</TableCell>
            <TableCell>
              <Button
                size="small"
                style={{ backgroundColor: '#C0C6F1', float: 'right' }}
                onClick={this.timeToggleHandler.bind(this)}
              >
                {timeActive ? 'Enable Fitler' : 'Disable Filter'}
              </Button>
            </TableCell>
          </TableHead>
          <TableBody>
            <TableCell>
              From:
              <input
                id="timeFrom"
                type="date"
                name="timeFrom"
                disabled={timeActive}
                onChange={(e) => this.setState({ timeFrom: e.target.value })}
              />
                To:
              <input
                id="timeTo"
                type="date"
                name="timeTo"
                disabled={timeActive}
                onChange={(e) => this.setState({ timeTo: e.target.value })}
              />
            </TableCell>
          </TableBody>
        </Table>
        <Typography
          style={{
            paddingLeft: '18px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
          onClick={this.submitClickHandler.bind(this)}
        >
          Submit Query
        </Typography>
        {submit && (
          <Typography id="report">
            <ReportDataTable
              groupId={groupIndex}
              retailerId={retailerIndex}
              timeFrom={timeFrom}
              timeTo={timeTo}
            />
          </Typography>
        )}
      </TableContainer>
    );
  }
}
