import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  // Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddUser from '../subcomponents/AddUser';
import UserBO from '../../api/UserBO';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import ShoppingAPI from '../../api/ShoppingAPI';

/**
 *
 *
 * @author Lukas Rutkauskas
 */

export class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      memberIndex: -1,
      open: false,
      user: {},
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMemberEmailChange = (e) => {
    this.setState({ userMail: e.target.value });
  };

  delUser = (id) => {
    this.setState({
      users: [...this.state.users.filter((user) => user.id !== id)],
    });
  };

  addGroupMembership = (addedUser) => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(addedUser.id);
    newMembership.setGroupMembership(this.state.currentGroup.id);
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

  addUserToGroup = () => {
    this.getAddedUserByEmail();
    console.log(this.state.user);
    this.state.users.unshift(this.state.user);
    this.setState({ users: this.state.users });
    console.log(this.state.users);
  };

  componentDidMount = () => {
    // this.fetchUsers();
    console.log('All Callbacks initialised');
  };

  delUser = (id) => {
    this.setState({
      users: [...this.state.users.filter((user) => user.id !== id)],
    });
  };

  addUser = (email) => {
    const newUser = new UserBO();
    newUser.setEmail(email);
    this.setState({ users: [...this.state.users, newUser] });
  };

  render() {
    const users = this.state.users;
    const open = this.state.open;

    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: 'right' }}
          onClick={this.handleClickOpen}
        >
          <PersonIcon />
        </IconButton>
        <Dialog
          align="center"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen={true}
        >
          <DialogTitle id="form-dialog-title">Groupmembers</DialogTitle>
          <DialogContent>
            <TableContainer
              style={{ width: Math.round(window.innerWidth * 0.3) }}
              component={Paper}
            >
              <Table
                size="medium"
                aria-label="spanning table"
                // style={{ height: Math.round(window.innerHeight * 0.3) }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Select Group:</b>
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
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditGroup;
