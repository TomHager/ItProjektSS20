import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import UserBO from '../../api/UserBO';
import RetailerBO from '../../api/RetailerBO';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import RetailerGroupBO from '../../api/RetailerGroupBO';
import FavoriteBO from '../../api/FavoriteBO';

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
      GroupmemberShip: null,
      retailers: null,
    };
  }

  //User

  getCurrUser = () => {
    console.log('Eingeloggter User:', firebase.auth().currentUser.displayName);
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((returnedUser) => {
        this.setState({ user: returnedUser });
      });
  };

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

  //Retailer

  addRetailerToDatabase = () => {
    const newRetailer = new RetailerBO();
    newRetailer.setName('Aldi');
    ShoppingAPI.getAPI()
      .addRetailer(newRetailer)
      .catch((e) => {
        console.info(e);
      });
  };

  //Groupmembership

  getgroupMemebershipByUserID = () => {
    ShoppingAPI.getAPI()
      .searchGroupsByMember(1)
      .then((result) => {
        this.setState({ GroupmemberShip: result });
        console.log(this.state.GroupmemberShip);
      });
  };

  addGroupMembership = () => {
    const newMembership = new GroupMembershipBO();
    newMembership.setGroupMember(4);
    newMembership.setGroupMembership(3);
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addGroupMembership(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  results = () => {
    console.log(this.state.GroupmemberShip);
  };

  //RetailerGroup

  addRetailergroup = () => {
    const newMembership = new RetailerGroupBO();
    newMembership.setRetailerGroup(3);
    newMembership.setRetailerMember(3);
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addRetailerGroup(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  //Notwendig für Favorites

  //Läuft
  getgroupMemebershipByUserID = () => {
    ShoppingAPI.getAPI()
      .searchGroupsByMember(1)
      .then((result) => {
        this.setState({ GroupmemberShip: result });
        console.log(this.state.GroupmemberShip);
      });
  };

  //TODO
  // getFavoritesByGroup = () => {
  //   ShoppingAPI.getAPI().
  // }

  addFavorite = () => {
    const newFavorite = new FavoriteBO();
    newFavorite.setArticle('Zwiebeln');
    newFavorite.setUnit('kg');
    newFavorite.setAmount(1);
    console.log(newFavorite);
    ShoppingAPI.getAPI().addFavorite(newFavorite);
  };

  // updateFavorite

  // componentDidMount() {
  //   this.getUsers();
  // }

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
  componentDidMount() {
    this.getUsers();
    this.getgroupMemebershipByUserID();
  }

  render() {
    return (
      <Button onClick={this.getgroupMemebershipByUserID}>
        Let the testing begin!
      </Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
