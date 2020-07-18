import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
export default class DeleteRetailerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    console.log(this.open);
  };

  handleCloseYes = () => {
    this.setState({ open: false });
    console.log(this.open);
    // this.props.delRetailer;
  };

  handleCloseNo = () => {
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
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete the Retailer"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to detete the Retailer?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseYes} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleCloseNo} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
