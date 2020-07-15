import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import IconButton from "@material-ui/core/IconButton";

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
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    console.log(this.open);
  };

  handleClose = () => {
    this.setState({ open: false });
    console.log(this.open);
  };

  render() {
    const open = this.state.open;
    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: "right" }}
          onClick={this.handleClickOpen}
        >
          <GroupAddIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a new Group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the group
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Group name"
              type="email"
            />
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

export default CreateGroup;
