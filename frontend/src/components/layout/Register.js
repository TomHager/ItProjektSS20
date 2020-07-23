import React, { Component } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import ShoppingAPI from '../../api/ShoppingAPI';
import UserBO from '../../api/UserBO';

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
  // registerUser = () => {
  //   this.state.username !== ''
  //     ? this.setState({ username: this.state.username })
  //     : console.log('Please enter a valid username');
  // };

  // fetchEmail = () => {
  //   const email = 'unchangeable@email.com';
  //   return email;
  // };

  addUserToDatabase = () => {
    const newUser = new UserBO();
    newUser.setExternalId(firebase.auth().currentUser.uid);
    newUser.setName(firebase.auth().currentUser.displayName);
    newUser.setEmail(firebase.auth().currentUser.email);
    ShoppingAPI.getAPI()
      .addUser(newUser)
      .catch((e) => {
        console.info(e);
      });
  };

  render() {
    return (
      <Paper elevation={0} align="center">
        <br />
        <Typography>Hello {firebase.auth().currentUser.displayName}</Typography>
        <br />
        <Typography>
          If you are using this app the first time, please activate your account
          in <b>iKauf</b>:
        </Typography>

        <br />
        <Button
          value="Activate"
          onClick={this.addUserToDatabase}
          style={{ backgroundColor: 'lightblue' }}
        >
          Activate
        </Button>
      </Paper>
    );
  }
}
