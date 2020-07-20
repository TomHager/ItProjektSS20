import React, { Component } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';

/**
 * Shows the register page for first time users
 *
 * @author Tom Hager
 */

export default class Register extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      username: '',
    };
  }

  // Asynccallback post username for new user
  registerUser = () => {
    this.state.username !== ''
      ? this.setState({ username: this.state.username })
      : console.log('Please enter a valid username');
  };

  fetchEmail = () => {
    const email = 'unchangeable@email.com';
    return email;
  };

  render() {
    return (
      <Paper elevation={0} align="center">
        <br />
        <Typography>
          <h3>
            Register for <b>iKauf</b>
          </h3>
        </Typography>
        <TextField
          type="text"
          id="username"
          variant="outlined"
          label="Username"
          onChange={(e) => this.setState({ username: e.target.value })}
        ></TextField>
        <br />
        <br />
        <Typography>{this.fetchEmail()}</Typography>
        <br />
        <Button
          value="Register"
          onClick={this.registerUser.bind(this)}
          style={{ backgroundColor: 'lightblue' }}
        >
          Regiseter
        </Button>
      </Paper>
    );
  }
}
