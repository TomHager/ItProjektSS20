import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // IconButton,
} from '@material-ui/core';
// import ShoppingAPI from "../../api/ShoppingAPI";
import EditGroup from '../dialogs/EditGroup';
import ManageGroup from '../dialogs/ManageGroup';
import CreateGroup from '../dialogs/CreateGroup';
import LeaveGroupAlert from '../dialogs/LeaveGroupAlert';

/**
 *
 *
 * @author Tom Hager
 * @author Lukas Rutkauskas
 */

export default class GroupList extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      groupRows: [],
      groupIndex: -1,
    };
  }

  //Group Functions
  async fetchGroups() {
    const res = await fetch('http://DESKTOP-S3RCLLP:8081/api/iKauf/groups');
    const resjson = await res.json();
    this.setState({ groupRows: resjson });
    console.log(resjson);
  }

  // groupClickHandler(group) {
  //   this.setState({ groupIndex: group.id });
  //   console.log(`Selected: ${group.name} with index of ${group.id}`);
  // }

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.fetchGroups();
    console.log('All Callbacks initialised');
  };

  render() {
    const groupRows = this.state.groupRows;
    return (
      <div align="center">
        <TableContainer
          style={{ width: Math.round(window.innerWidth * 0.3), margin: '3em' }}
          component={Paper}
        >
          {/* Group Table */}
          <Table
            size="small"
            aria-label="spanning table"
            // style={{ height: Math.round(window.innerHeight * 0.3) }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Your Groups:</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <CreateGroup />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {groupRows.map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.id === this.state.groupIndex ? '#0090FF' : 'white',
                  }}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <LeaveGroupAlert />
                  </TableCell>
                  <TableCell>
                    <EditGroup />
                  </TableCell>
                  <TableCell>
                    <ManageGroup />
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
