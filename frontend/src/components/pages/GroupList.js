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
import ShoppingAPI from '../../api/ShoppingAPI';
import EditGroup from '../dialogs/EditGroup';
import ManageGroup from '../dialogs/ManageGroup';
import CreateGroup from '../dialogs/CreateGroup';
import LeaveGroupAlert from '../dialogs/LeaveGroupAlert';
import firebase from 'firebase/app';

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
      user: null,
      groupMemberships: [],
    };
  }

  //Group Functions
  // async fetchGroups() {
  //   const res = await fetch('http://DESKTOP-S3RCLLP:8081/api/iKauf/groups');
  //   const resjson = await res.json();
  //   this.setState({ groupRows: resjson });
  //   console.log(this.state.groupRows);
  // }

  getCurrUser = () => {
    console.log('Eingeloggter User:', firebase.auth().currentUser.displayName);
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((returnedUser) => {
        this.setState({ user: returnedUser });
      });
  };

  getGroupMembershipByUserId = () => {
    console.log('Get groupmemberships');
    ShoppingAPI.getAPI()
      .getGroupMembership(1)
      .then((returnedGroupmemberships) => {
        return this.setState({ groupMemberships: returnedGroupmemberships });
        console.log(this.state.groupMemberships);
      });
  };

  getGroupsByGroupId = () => {
    console.log('Getting groups');
    this.getCurrUser();
    ShoppingAPI.getAPI()
      .getGroupsByUserId(this.state.user[0].id)
      .then((returnedGroups) => {
        return this.setState({ groupRows: returnedGroups });
      });
  };

  deleteGroupMembership = (groupID) => {
    ShoppingAPI.getAPI()
      .deleteGroupMembership(groupID)
      .then(
        this.setState({
          groupRows: this.state.groupRows.filter(
            (group) => group.getID() !== groupID
          ),
        })
      );
  };

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.getGroupMembershipByUserId();
    console.log('All Callbacks initialised');
  };

  render() {
    const groupRows = this.state.groupRows;
    const { user } = this.props;
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
                    <LeaveGroupAlert currentUser={user} />
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
