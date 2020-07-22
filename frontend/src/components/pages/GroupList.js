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
import 'firebase/auth';

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
    };
  }

  //Group Functions
  async fetchGroups() {
    const res = await fetch('http://DESKTOP-S3RCLLP:8081/api/iKauf/groups');
    const resjson = await res.json();
    this.setState({ groupRows: resjson });
    console.log(this.state.groupRows);
  }

  getCurrUser = () => {
    console.log('Eingeloggter User:', firebase.auth().currentUser.displayName);
    ShoppingAPI.getAPI()
      .getUserByExternalId(firebase.auth().currentUser.uid)
      .then((returnedUser) => {
        return this.setState({ user: returnedUser }), this.getGroupsByUser();
      });
  };

  getGroupsByUserId = () => {
    console.log('Getting groups');
    ShoppingAPI.getAPI()
      .getGroupsByUserId(this.state.user.getID())
      .then((returnedGroups) => {
        return this.setState({ groupRows: returnedGroups });
      });
  };

  getGroupMembersByGroupId = () => {
    console.log('Get groupMembers');
    ShoppingAPI.getAPI()
      .getGroupMembership(this.state.group.getID())
      .then((returnedMembers) => {
        return this.setState({ groupMembers: returnedMembers });
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
    this.fetchGroups();
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
