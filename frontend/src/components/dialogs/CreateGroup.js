import React, { Component } from 'react';
import {
  TextField,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupBO from '../../api/GroupBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

/**
 *
 * @author Lukas Rutkauskas
 * @author Tom Hager
 */

export class CreateGroup extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      open: false,
      users: [],
      groupName: '',
      allUsers: [],
      errorEmail: false,
      errorGroup: false,
    };
  }

  getAllUsers = () => {
    ShoppingAPI.getAPI()
      .getUsers()
      .then((allUsers) => {
        console.log(allUsers)
        this.setState({ allUsers });
      });
  };

  getGroupByName = () => {
    ShoppingAPI.getAPI()
      .searchGroupByName(this.state.groupName)
      .then((createdGroup) => {
        this.addGroupMembershipForCurrentUser(createdGroup);
      });
  };

  addGroupMembership = (addedUser) => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(addedUser.id);
    newMembership.setGroupMembership(
      this.state.createdGroup[this.state.createdGroup.length - 1].id
    );
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        this.state.users.push(addedUser);
        this.setState({ users: this.state.users });
      });
  };

  getAddedUserByEmail = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail(this.state.userMail)
      .then((user) => {
        console.log(user[0]);
        setTimeout(() => {
          this.addGroupMembership(user[0]);
        }, 1);
      });
  };

  componentDidMount = () => {
    this.getAllUsers();
    console.log('All Callbacks initialised');
  };

  handleCreateGroup = () => {
    this.setState({ errorEmail: false });
    const newGroup = new GroupBO();
    newGroup.setName(this.state.groupName);
    ShoppingAPI.getAPI()
      .addGroup(newGroup)
      .then(console.log('Created group: ' + this.state.groupName), this.getGroupByName())
      .catch((e) => {
        console.info(e);
      });
  };

  validateAddGroup = () => {
    this.state.groupName.trim() !== ''
      ? this.handleCreateGroup()
      : this.setState({ errorGroup: true });
  };

  addGroupMembershipForCurrentUser = (createdGroup) => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(this.props.currentUser.id);
    newMembership.setGroupMembership(createdGroup[createdGroup.length - 1].id);
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  deleteUser = (id) => {
    ShoppingAPI.getAPI().deleteUser(id);
    this.setState({
      users: [...this.state.users.filter((user) => user.id !== id)],
    });
  };

  // @TODO Wird nicht aufgeruden und würde this.handleCreateGroup aufrufen und nicht add User
  validateAddUser = () => {
    const { userMail, allUsers } = this.state;
    allUsers.filter((x) => x.email === userMail.trim())
      ? this.setState({ errorEmail: true })
      : this.getAddedUserByEmail();
  };

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    console.log(this.state.allUsers)
    const { open, users, errorEmail, errorGroup } = this.state;
    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: 'right' }}
          onClick={this.toggleOpen}
        >
          <GroupAddIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.toggleOpen}
          aria-labelledby="form-dialog-title"
          fullScreen={true}
          align="center"
        >
          <DialogTitle id="form-dialog-title">Create a new Group</DialogTitle>
          <DialogContent>
            <TableContainer
              style={{ width: Math.round(window.innerWidth * 0.3) }}
              component={Paper}
            >
              <TextField
                style={{ float: 'left', marginLeft: '20px', paddingTop: '2em' }}
                autoFocus
                margin="dense"
                id="name"
                placeholder="Group name"
                type="text"
                error={errorGroup}
                onChange={(e) => this.setState({ groupName: e.target.value })}
              />
              <IconButton
                aria-label="Edit"
                onClick={this.validateAddGroup()}
                style={{ float: 'left', marginTop: '1em', marginLeft: '5px' }}
              >
                <GroupAddIcon />
              </IconButton>
              <Table
                size="medium"
                aria-label="spanning table"
                // style={{ height: Math.round(window.innerHeight * 0.3) }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b style={{ flex: '10', padding: '5px' }}>Users:</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <TextField
                          type="text"
                          name="user"
                          label="usermail"
                          style={{ flex: '10', padding: '5px' }}
                          placeholder="Add user ..."
                          error={errorEmail}
                          onChange={(e) => this.setState({ userMail: e.target.value })}
                        ></TextField>
                        <IconButton onClick={this.validateAddUser}>
                          <PersonAddIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      key={row.id}
                      // style={{
                      //   backgroundColor:
                      //     row.id === this.state.memberIndex
                      //       ? '#0090FF'
                      //       : 'white',
                      // }}
                      // onClick={this.groupClickHandler.bind(this, row)}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Edit"
                          style={{ float: 'right' }}
                          onClick={this.deleteUser.bind(this, row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleOpen} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={this.handleClose} color="primary"> */}
            <Button onClick={this.toggleOpen} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateGroup;
