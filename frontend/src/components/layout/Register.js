import React, { Component } from 'react';
import { Paper, Typography, Input, Button } from '@material-ui/core';

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
        <Typography>
          <h3>
            Register for <b>iKauf</b>
          </h3>
        </Typography>
        <Input
          type="text"
          id="username"
          placeholder="enter username"
          onChange={(e) => this.setState({ username: e.target.value })}
        ></Input>
        <Typography>{this.fetchEmail()}</Typography>
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
