import React, { Component } from 'react';
import {
  TextField,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
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
// import { v4 as uuidv4 } from 'uuid';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

/**
 *
 *
 * @author Lukas Rutkauskas
 */

export class CreateGroup extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      open: false,
      users: [],
      groupName: '',
      createdGroup: [],
      user: {},
    };
  }

  handleCreateGroup = (event) => {
    event.preventDefault();
    const newGroup = new GroupBO();
    newGroup.setName(this.state.groupName);
    ShoppingAPI.getAPI()
      .addGroup(newGroup)
      .then(
        console.log('Created group: ' + this.state.groupName),
        this.getGroupByName()
      )
      .catch((e) => {
        console.info(e);
      });
  };

  getGroupByName = () => {
    ShoppingAPI.getAPI()
      .searchGroupByName(this.state.groupName)
      .then((result) => {
        this.setState({ createdGroup: result });
        this.addGroupMembershipForCurrentUser(this.state.createdGroup);
      });
  };

  addGroupMembershipForCurrentUser = (createdGroup) => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(this.props.currentUser.id);
    newMembership.setGroupMembership(
      this.state.createdGroup[createdGroup.length - 1].id
    );
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  addGroupMembership = (addedUser) => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(addedUser.id);
    newMembership.setGroupMembership(
      this.state.createdGroup[this.state.createdGroup.length - 1].id
    );
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  getAddedUserByEmail = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail(this.state.userMail)
      .then((returnedUser) => {
        console.log(returnedUser[0]);
        setTimeout(() => {
          this.setState({ user: returnedUser[0] });
          console.log(this.state.user);
          this.addGroupMembership(this.state.user);
        }, 1);
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleGroupNameOnChange = (event) => {
    this.setState({ groupName: event.target.value });
  };

  handleMemberEmailChange = (e) => {
    this.setState({ userMail: e.target.value });
  };

  delUser = (id) => {
    this.setState({
      users: [...this.state.users.filter((user) => user.id !== id)],
    });
  };

  addUserToGroup = () => {
    this.getAddedUserByEmail();
    console.log(this.state.user);
    this.state.users.unshift(this.state.user);
    this.setState({ users: this.state.users });
    console.log(this.state.users);
  };

  render() {
    const open = this.state.open;
    const users = this.state.users;
    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: 'right' }}
          onClick={this.handleClickOpen}
        >
          <GroupAddIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
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
                onChange={this.handleGroupNameOnChange}
              />
              <IconButton
                aria-label="Edit"
                onClick={this.handleCreateGroup}
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
                          style={{ flex: '10', padding: '5px' }}
                          placeholder="Add user ..."
                          onChange={this.handleMemberEmailChange}
                        ></TextField>
                        <IconButton onClick={this.addUserToGroup}>
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
                          onClick={this.delUser.bind(this, row.id)}
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
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={this.handleClose} color="primary"> */}
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateGroup;
