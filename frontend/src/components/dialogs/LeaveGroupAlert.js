import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default class LeaveGroupAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userId: null,
      membership: [],
    };
  }

  delMembership = () => {
    this.props.delMembership(this.props.user.id, this.props.groupId);
  };

  render() {
    const open = this.state.open;
    return (
      <div>
        <IconButton
          aria-label="Edit"
          style={{ float: 'right' }}
          onClick={this.setState({ open: true })}
        >
          <ExitToAppIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Leave the group'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to leave the group?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.delMembership} color="primary">
              Yes
            </Button>
            <Button onClick={this.setState({ open: false })} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
