import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

/**
 * Shows the about page with the impressum
 *
 * @author Lukas Rutkauskas
 */

export class GroupDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  //   console.log(this.open);
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  //   console.log(this.open);
  // };

  // handleSubmit = () => {

  // }

  render() {
    const open = this.state;

    return (
      <div>
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
              type="email"
              fullWidth
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

export default GroupDialog;
