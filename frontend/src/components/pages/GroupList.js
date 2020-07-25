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
import Button from '@material-ui/core/Button';

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
        this.setState({ currentUser: returnedUser[0] });
        this.getGroupMembershipsByUserId(this.state.currentUser);
      });
  };

  getGroupMembershipsByUserId = (currentUser) => {
    console.log('Get groupmemberships');
    console.log(currentUser);
    ShoppingAPI.getAPI()
      .searchGroupsByMember(currentUser.id)
      .then((result) => {
        this.setState({ groupMemberships: result });
        console.log(this.state.groupMemberships);
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

  filterGroupsByGroupId = (allGroups) => {
    const groupMemberships = this.state.groupMemberships;
    console.log(groupMemberships);
    const groups = [];
    for (let i of groupMemberships) {
      groups.push(allGroups.filter((x) => x.id === i.group_membership));
    }
    // const i = allGroups.findIndex((x) => x.id === groupMemberships);
    // groups.push(i);
    // console.log(allGroups.filter((x) => x.id.toString().indexOf('1')) > -1);
    // for (let i of groupMemberships) {
    //   allGroups.filter((x) => x.id === i.group_membership);
    // }
    console.log(groups);
    this.setState({ filteredGroups: groups });
    console.log(this.state.filteredGroups);
  };

  // getGroupsByGroupId = () => {
  //   for(let i = 0, i < console.log('Getting groups');
  //   this.getCurrUser();
  //   ShoppingAPI.getAPI()
  //     .getGroup(this.state.groupMemberships[0])
  //     .then((returnedGroups) => {
  //       this.setState({ group: returnedGroups });
  //       console.log(this.state.group);
  //     });
  // };

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
    this.getCurrUser();
    this.getAllGroups();
    console.log('All Callbacks initialised');
  };

  render() {
    const groupRows = this.state.groupRows;
    const filteredGroups = this.state.filteredGroups;
    const { user } = this.props;
    console.log(filteredGroups);
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
                  <CreateGroup currentUser={this.state.currentUser} />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredGroups.map((x) => (
                <TableRow
                  key={x.id}
                  // style={{
                  //   backgroundColor:
                  //     index === this.state.groupIndex ? '#0090FF' : 'white',
                  // }}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  <TableCell>{x.name}</TableCell>
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
