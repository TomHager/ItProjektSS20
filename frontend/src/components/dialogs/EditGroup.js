import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

/**
 *
 * @author Erik Lebedkin
 * @author Lukas Rutkauskas
 */

export class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      newName: '',
      error: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // updateGroup = () => {
  //   var group = this.state.groupBO;
  //   group.setName(this.state.newName);
  //   ShoppingAPI.getAPI()
  //     .updateGroup(group)
  //     .then(
  //       function () {
  //         ShoppingAPI.getAPI()
  //           .getGroupById(group.getID())
  //           .then(
  //             (GroupBO) =>
  //               this.setState({
  //                 groupBO: GroupBO,
  //               })
  //           );
  //       }.bind(this)
  //     );
  // };

  handleUpdate = () => {
    this.state.newName.trim() !== ''
      ? this.props.EditGroup(this.state.newName.trim(), this.props.group.id)
      : this.setState({ error: true });
  };

  render() {
    const open = this.state.open;
    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: 'right' }}
          onClick={this.handleClickOpen}
        >
          <EditIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter a new group name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Group name"
              type="text"
              defaultValue={this.props.group.name}
              onChange={(e) => this.setState({ newName: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditGroup;
