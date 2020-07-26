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
} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI';
import EditGroup from '../dialogs/EditGroup';
import ManageGroup from '../dialogs/ManageGroup';
import CreateGroup from '../dialogs/CreateGroup';
import LeaveGroupAlert from '../dialogs/LeaveGroupAlert';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import GroupBO from '../../api/GroupBO';

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
      currentUser: {},
      groupMemberships: [],
      allGroups: [],
      filteredGroups: [],
    };
  }

  getCurrUser = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((user) => {
        this.getGroupMembershipsByUserId(user[0]);
      });
  };

  getGroupMembershipsByUserId = (currentUser) => {
    this.setState({ currentUser });
    ShoppingAPI.getAPI()
      .searchGroupsByMember(currentUser.id)
      .then((groupMemberships) => {
        if (groupMemberships.length > 0) {
          console.log(groupMemberships);
          this.setState({ groupMemberships });
          this.getAllGroups();
        }
        // @TODO evtl fix for no Group
      });
  };

  getAllGroups = () => {
    ShoppingAPI.getAPI()
      .getGroups()
      .then((result) => {
        console.log(result);
        this.filterGroupsByGroupId(result);
      });
  };

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.getCurrUser();
    console.log('All Callbacks initialised');
  };

  filterGroupsByGroupId = (allGroups) => {
    const groupMemberships = this.state.groupMemberships;
    console.log(groupMemberships);
    const groups = [];
    for (let i of groupMemberships) {
      groups.push(allGroups.filter((x) => x.id === i.group_membership));
    }
    const fixedGroups = groups.map((x) => x[0]);
    console.log(fixedGroups);
    this.setState({ filteredGroups: fixedGroups });
    console.log(this.state.filteredGroups);
  };

  // @TODO evtl Group löschen wenn sie keinen Member mehr hat
  deleteGroupMembership = (groupId, userId) => {
    ShoppingAPI.getAPI()
      .deleteGroupMembership(groupId, userId)
      .then(() => this.checkForEmptyGroup(groupId));
    this.setState({
      groupRows: this.state.groupRows.filter((group) => group.getID() !== groupId),
    });
  };

  checkForEmptyGroup = (groupId) => {
    ShoppingAPI.getAPI()
      .searchMembersByGroup(groupId)
      .then((groupMemberships) => {
        if (groupMemberships.length === 0) {
          ShoppingAPI.getAPI().deleteGroup(groupId);
        }
      });
  };

  // @TEST
  editGroup = (id, name) => {
    const group = new GroupBO();
    group.setID(id);
    group.setName(name);
    ShoppingAPI.getAPI()
      .updateGroup(group)
      .catch((error) => console.error('Error:', error));
    console.log(this.state.newName);
  };

  render() {
    // const groupRows = this.state.groupRows;
    const { filteredGroups, currentUser } = this.state;
    return (
      <div align="center">
        {/* <Button onClick={}>Click</Button> */}
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
                  <CreateGroup currentUser={currentUser} />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredGroups.map((row) => (
                <TableRow
                  key={row.id}
                  // style={{
                  //   backgroundColor:
                  //     index === this.state.groupIndex ? '#0090FF' : 'white',
                  // }}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  <TableCell>
                    <Button
                      component={Link}
                      to={{
                        pathname: '/shoppingList',
                        state: {
                          groupId: row.id,
                        },
                      }}
                    >
                      {row.name}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <LeaveGroupAlert
                      groupId={row.id}
                      leaveGroup={this.deleteGroupMembership}
                      user={currentUser}
                    />
                  </TableCell>
                  <TableCell>
                    <EditGroup group={row} editGroup={this.editGroup} />
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
