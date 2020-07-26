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
import GroupBO from '../../api/GroupBO';

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
      });
  };

  // Start Callbacks
  componentDidMount() {
    this.setState({ groupName: this.props.groupName });
    this.fetchAllUser;
    console.log('Mount');
  }

  // Validate Add User
  validateAddUser = () => {
    const { userEmail, users } = this.state;
    let req = new RegExp(userEmail.trim(), 'g');
    users.match(req)
      ? this.setState({ errorEmail: true })
      : this.AddUser(users.match(req));
  };

  // Validate Edit Group
  validateEditGroup = () => {
    this.state.editGroupName.trim() !== ''
      ? this.UpdateGroupName()
      : this.setState({ errorGroup: true });
  };

  // @TEST
  // Add User
  AddUser = (user) => {
    const { users, userEmail } = this.state;
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

  // @TEST
  // Update GroupName
  UpdateGroupName = () => {
    const group = new GroupBO();
    group.setID(this.props.groupId);
    group.setName(this.state.editGroupName.trim());
    ShoppingAPI.getAPI()
      .updateGroup(group)
      .then(() => {
        // On success
        this.setState({ groupName: group.name, editGroupActive: false });
      });
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
                    { groupName }
                  ) : (
                    <Input
                      id="editGroup"
                      type="test"
                      placeholder="enter new group name"
                      label="Group Name"
                      error={errorGroup}
                      onChange={(e) => this.setState({ editGroupName: e.target.value })}
                    ></Input>
                  )}
                </TableCell>
                <TableCell>
                  {!editGroupActive ? (
                    <IconButton
                      onClick={this.setState({
                        editGroupActive: frue,
                        editGroup: groupName,
                      })}
                    >
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
              type="email"
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

          <Button onClick={this.leaveGroup}>Leave Group</Button>
        </Container>
      </React.Fragment>
    );
  }
}
