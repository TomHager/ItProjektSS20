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
import AddUser from '../subcomponents/AddUser';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupBO from '../../api/GroupBO';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import { v4 as uuidv4 } from 'uuid';

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
      // currentUser: 1,
    };
  }

  // handleGroupCreation = () => {
  //   const newGroup = new GroupBO();
  //   newGroup.setName(this.state.groupName);
  //   ShoppingAPI.getAPI()
  //     .addGroup(newGroup)
  //     .then((group) => this.handleGroupMembershipCreation(group.getID()));
  // };

  // handleGroupMembershipCreation = (groupId) => {
  //   const group_list = this.state.users;
  //   const new_group_membership = new GroupMembershipBO();

  //new_group_membership.setGroupMembership(this.state.currentUser)
  //   new_group_membership.setGroupMember(this.state.currentUser);

  //   ShoppingAPI.getAPI().addGroupMember(new_group_membership);

  //   group_list.map((group) =>
  //     ShoppingAPI.getAPI()
  //       .searchUserByName(group)
  //       .then(
  //         function (user) {
  //           new_group_membership.setGroupMember(user.getID());
  //           ShoppingAPI.getAPI().addGroupMember(new_group_membership);
  //           console.log(new_group_membership).then(this.handleClose);
  //         }.bind(this)
  //       )
  //   );
  // };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleGroupNameOnChange = (event) => {
    this.setState({ groupName: event.target.value });
  };

  delUser = (id) => {
    this.setState({
      users: [...this.state.users.filter((user) => user.id !== id)],
    });
  };

  addUser = (email) => {
    const newUser = {
      id: uuidv4(),
      email,
    };
    this.setState({ users: [...this.state.users, newUser] });
  };

  handleCreateGroup = (event) => {
    event.preventDefault();
    const newGroup = new GroupBO();
    newGroup.setName(this.state.groupName);
    ShoppingAPI.getAPI()
      .addGroup(newGroup)
      .then(console.log('Created group: ' + this.state.groupName));
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
                type="email"
                onChange={this.handleGroupNameOnChange}
              />
              <IconButton
                aria-label="Edit"
                onClick={this.handleCreateGroup.bind(this)}
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
                      <AddUser addUser={this.addUser} />
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      key={row.id}
                      style={{
                        backgroundColor:
                          row.id === this.state.memberIndex
                            ? '#0090FF'
                            : 'white',
                      }}
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
            <Button onClick={this.handleClickOpen} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={this.handleClose} color="primary"> */}
            <Button onClick={this.handleGroupCreation} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateGroup;
