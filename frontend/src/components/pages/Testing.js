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
      user: null,
    };
  }

  async fetchGroups() {
    const res = await fetch('http://127.0.0.1:5000/iKauf/user');
    const resjson = await res.json();
    // this.setState({ users: resjson });
    console.log(resjson);
  }

  getUsers = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail('berndbernd')
      .then((returnedUser) => {
        return this.setState({ user: returnedUser });
      });
    console.log(this.state.user);
  };

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
    return (
      <Button onClick={this.getUsers}>Display users</Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
