import { Add, Edit, Check } from '@material-ui/icons';
import React, { Component } from 'react';
// import ShoppingAPI from '../../api/ShoppingAPI';
// import { addEntry } from '../../actions/shoppingList';
import {
  Container,
  CssBaseline,
  Input,
  Typography,
  IconButton,
  TableCell,
  Table,
  TableRow,
  Button,
} from '@material-ui/core';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import ShoppingAPI from '../../api/ShoppingAPI';

/**
 * Displays favorites for given group
 *
 * @author Tom Hager
 */

export default class GroupManagement extends Component {
  constructor(props) {
    super(props);
    // groupId
    // groupName
    // leaveGroup(groupId)

    // Init an empty state
    this.state = {
      //passed Columns and Data loaded into state
      data: [], // Users of group
      users: [], // All existing Users
      groupName: '',

      // Add User
      userEmail: '',
      // Edit GroupName
      editGroupActive: false,
      editGroupName: '',

      // Error
      errorEmail: false,
      errorGroup: false,
    };
  }

  //All Fetch Fucnstions
  // Fetch all Users
  fetchAllUser = () => {
    ShoppingAPI.getAPI()
      .getUsers()
      .then((users) => {
        this.setState({ users });
        this.getUserForGroup(users);
        console.log('users');
        console.log(users);
      });
  };

  // @TODO
  getUserForGroup = (users) => {
    ShoppingAPI.getAPI()
      .searchMembersByGroup(this.props.groupId)
      .then((groupMemberships) => {
        const data = [];
        for (let i of groupMemberships) {
          data.push(users.find((x) => x.id === i.member));
        }
        this.setState({ data });
        console.log('data');
        console.log(data);
      });
  };

  // Start Callbacks
  componentDidMount() {
    console.log('ITS HERE');
    console.log(this.props.groupId);
    console.log(this.props.groupName);

    this.setState({ groupName: this.props.groupName });
    this.fetchAllUser();
  }

  triggerEdit = () => {
    console.log(this.state.groupName);
    this.setState({
      editGroupActive: true,
      editGroupName: this.state.groupName,
    });
  };

  // Validate Add User
  validateAddUser = () => {
    const { userEmail, users, data } = this.state;
    let userMatch = null;
    for (let i of users) {
      console.log(i.email);
      if (i.email.toLowerCase() === userEmail.toLowerCase().trim()) {
        userMatch = i;
      }
    }
    if (userMatch !== null) {
      data.find((x) => x.email === userMatch.email) !== undefined
        ? this.setState({ errorEmail: true })
        : this.AddUser(userMatch);
    }
  };

  // Validate Edit Group
  validateEditGroup = () => {
    console.log(this.state.editGroupName);
    this.state.editGroupName.trim() !== ''
      ? this.UpdateGroupName()
      : this.setState({ errorGroup: true });
  };

  // @TEST
  // Add User
  AddUser = (user) => {
    // Get given User
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMembership(this.props.groupId);
    newMembership.setGroupMember(user.id);

    // Add to GroupMembershipTable
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        this.state.data.push(user);
        this.setState({ data: this.state.data, userEmail: '' });
        document.getElementById('addEmail').value = '';
      });
  };

  // Update GroupName
  UpdateGroupName = () => {
    this.props.updateGroup(this.props.groupId, this.state.editGroupName.trim());
    this.setState({ groupName: this.state.editGroupName, editGroupActive: false });
  };

  leaveGroup = () => {
    this.props.leaveGroup(this.props.groupId);
  };

  render() {
    const { data, errorEmail, errorGroup, groupName, editGroupActive } = this.state;
    console.log('render');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />

          {/* Displays GroupName */}
          <Typography id="groupName">
            <Table>
              <TableRow>
                <TableCell>Gruppe:</TableCell>
                <TableCell>
                  {!editGroupActive ? (
                    <b>{groupName}</b>
                  ) : (
                    <Input
                      id="editGroup"
                      type="test"
                      placeholder="enter new group name"
                      label="Group Name"
                      defaultValue={groupName}
                      error={errorGroup}
                      onChange={(e) => this.setState({ editGroupName: e.target.value })}
                    ></Input>
                  )}
                </TableCell>
                <TableCell>
                  {!editGroupActive ? (
                    <IconButton onClick={this.triggerEdit}>
                      <Edit />
                    </IconButton>
                  ) : (
                    <IconButton onClick={this.validateEditGroup}>
                      <Check />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </Typography>

          {/* Add new User to Group */}
          <Typography id="add">
            <Input
              id="addEmail"
              type="text"
              placeholder="enter new email"
              label="User email"
              error={errorEmail}
              onChange={(e) => this.setState({ userEmail: e.target.value })}
            ></Input>
            <IconButton onClick={this.validateAddUser}>
              <Add />
            </IconButton>
          </Typography>

          {/* All User of Group */}
          {data.map((row) => (
            <Typography id={row.id}>{row.email}</Typography>
          ))}

          <Button id="leaveBtn" onClick={this.leaveGroup}>
            Leave Group
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}
