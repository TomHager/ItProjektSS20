import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import { Button } from '@material-ui/core';

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
    };
  }

  getUsers = () => {
    ShoppingAPI.getAPI()
      .getUsers()
      .then((userBOs) =>
        this.setState({
          // Set new state when CustomerBOs have been fetched
          users: userBOs,
          filteredUsers: [...userBOs], // store a copy
          loadingInProgress: false, // disable loading indicator
          error: null,
        })
      )
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
          users: [],
          loadingInProgress: false, // disable loading indicator
          error: e,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null,
    });
  };

  displayUsers = () => console.log(this.state.users);
  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <Button onClick={this.displayUsers.bind(this)}>Display users</Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
