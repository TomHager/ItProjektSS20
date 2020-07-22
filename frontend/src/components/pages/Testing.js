import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import UserBO from '../../api/UserBO';

export default class Testing extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      users: [],
      filteredUsers: [],
      loadingInProgress: false,
      error: null,
      user: null,
    };
  }

  getUsers = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail('berndbernd')
      .then((returnedUser) => {
        return this.setState({ user: returnedUser });
      });
  };

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

  deleteUser = () => {
    ShoppingAPI.getAPI().deleteUser(5);
  };

  updateUser = () => {
    const newUser = this.state.user;
    newUser[0].setName('Nemesis');
    ShoppingAPI.getAPI().updateUser(newUser[0]);
    console.log(newUser);
  };

  componentDidMount() {
    this.getUsers();
  }

  // getUsersByName = () => {
  //   ShoppingAPI.getAPI()
  //     .searchUserByName('Alex')
  //     .then((returnedUser) => {
  //       return this.setState({ user: returnedUser });
  //     });
  //   console.log(this.state.user);
  // };

  //     .catch((e) =>
  //       this.setState({
  //         // Reset state with error from catch
  //         users: [],
  //         loadingInProgress: false, // disable loading indicator
  //         error: e,
  //       })
  //     );

  //   // set loading to true
  //   this.setState({
  //     loadingInProgress: true,
  //     error: null,
  //   });
  // };

  // displayUsers = () => console.log(this.state.users);
  // componentDidMount() {
  //   this.getUsers();
  // }

  render() {
    this.addUserToDatabase();
    return (
      <Button onClick={this.updateUser}>Display users</Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
