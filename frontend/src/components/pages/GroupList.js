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
import { Link } from 'react-router-dom';

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
        this.getGroupMembershipsByUserId();
        this.getAllGroups();
      });
  };

  getGroupMembershipsByUserId = () => {
    console.log('Get groupmemberships');
    console.log(this.state.currentUser.id);
    ShoppingAPI.getAPI()
      .searchGroupsByMember(this.state.currentUser.id)
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
    const fixedGroups = groups.map((x) => x[0]);
    console.log(fixedGroups);
    this.setState({ filteredGroups: fixedGroups });
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

  // @TODO evtl Group löschen wenn sie keinen Member mehr hat
  deleteGroupMembership = (userId, groupID) => {
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

  // @TODO EDIT GROUP
  editGroup = (id, name) => {
    // CALLBACK
    // Das ist 1 zu 1 der code aus der anderen muss vmtl bearbeitet werden
    // const updatedGroup = this.state.newName;
    // ShoppingAPI.getAPI()
    //   .updateGroup(updatedGroup)
    //   .catch((error) => console.error('Error:', error));
    // console.log(this.state.newName);
  };

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.getCurrUser();
    console.log('All Callbacks initialised');
  };

  render() {
    // const groupRows = this.state.groupRows;
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
                      user={user}
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
