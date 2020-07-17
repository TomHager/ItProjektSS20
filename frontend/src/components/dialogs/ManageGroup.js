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
  // Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 *
 *
 * @author Lukas Rutkauskas
 */

export class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberRows: [],
      memberIndex: -1,
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

  // handleSubmit = () => {

  // }

  async fetchGroups() {
    const res = await fetch('http://DESKTOP-S3RCLLP:8081/api/iKauf/users');
    const resjson = await res.json();
    this.setState({ memberRows: resjson });
    console.log(this.memberRows);
  }

  componentDidMount = () => {
    this.fetchGroups();
    console.log('All Callbacks initialised');
  };

  delUser = (id) => {
    this.setState({
      memberRows: [...this.state.memberRows.filter((user) => user.id !== id)],
    });
  };

  render() {
    const memberRows = this.state.memberRows;
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
                </TableHead>

                <TableBody>
                  {memberRows.map((row) => (
                    <TableRow
                      key={row.id}
                      style={{
                        backgroundColor:
                          row.id === this.state.memberIndex ? '#0090FF' : 'white',
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