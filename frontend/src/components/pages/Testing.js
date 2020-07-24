import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import UserBO from '../../api/UserBO';
import RetailerBO from '../../api/RetailerBO';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import RetailerGroupBO from '../../api/RetailerGroupBO';
import FavoriteBO from '../../api/FavoriteBO';
import EntryBO from '../../api/EntryBO';
import ShoppingListBO from '../../api/ShoppingListBO';

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
      favorite: null,
      lists: null,
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
  //TODO
  addRetailerToDatabase = () => {
    const newRetailer = new RetailerBO();
    newRetailer.setName('Lidl');
    ShoppingAPI.getAPI()
      .addRetailer(newRetailer)
      .catch((e) => {
        console.info(e);
      });
  };

  //Groupmembership

  getgroupMembershipByUserID = () => {
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
    newMembership.setRetailerGroup(6);
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
  getgroupMembershipByUserID = () => {
    ShoppingAPI.getAPI()
      .searchGroupsByMember(1)
      .then((result) => {
        this.setState({ GroupmemberShip: result });
        console.log(this.state.GroupmemberShip);
      });
  };

  //Läuft
  getFavoritesByGroup = () => {
    ShoppingAPI.getAPI()
      .searchFavoriteByGroup(2)
      .then((result) => {
        this.setState({ favorite: result });
        console.log(this.state.favorite);
      });
  };

  //Läuft
  addFavorite = () => {
    const newFavorite = new FavoriteBO();
    newFavorite.setUnit('kg');
    newFavorite.setAmount(1);
    newFavorite.setArticle('Birnen');
    newFavorite.setRetailerID(4);
    newFavorite.setGroupID(3);
    console.log(newFavorite);
    ShoppingAPI.getAPI()
      .addFavorite(newFavorite)
      .catch((e) => {
        console.info(e);
      });
  };

  //Läuft
  updateFavorite = () => {
    const updatedFavorite = this.state.favorite;
    updatedFavorite[0].setUnit('l');
    ShoppingAPI.getAPI().updateFavorite(updatedFavorite[0]);
  };

  //Notwendig Für Shoppingliste
  //Läuft
  getShoppingListsByGroup = () => {
    ShoppingAPI.getAPI()
      .searchShoppingListByGroupId(2)
      .then((result) => {
        this.setState({ lists: result });
        console.log(this.state.lists);
      });
  };
  //Läuft
  getEntriesByShoppingList = () => {
    ShoppingAPI.getAPI()
      .getEntriesByShoppingListId(2)
      .then((result) => {
        this.setState({ lists: result });
        console.log(this.state.lists);
      });
  };

  //TODO
  // getEntriesByShoppingListandRetailer

  // TODO
  // getRetailersByGroup = () => {
  //   ShoppingAPI.getAPI()
  //     .
  //     .then((result) => {
  //       this.setState({ lists: result });
  //       console.log(this.state.lists);
  //     });
  // };
  // TODO
  // getUserByEntry = () => {
  //   ShoppingAPI.getAPI()
  //     .
  //     .then((result) => {
  //       this.setState({ lists: result });
  //       console.log(this.state.lists);
  //     });
  // };
  // Läuft
  updateEntrys = () => {
    const updatedEntry = {
      id: 3,
      unit: 'g',
      amount: 6,
      article: 'Ananas',
      modification_date: '2020-07-02T23:59:59',
      user_id: 1,
      retailer_id: 2,
      shopping_list_id: 1,
      bought: 0,
    };
    ShoppingAPI.getAPI().updateEntry(updatedEntry[0]);
  };

  // TODO
  createEntry = () => {
    const newEntry = new EntryBO();
    newEntry.setArticle('Wachteln');
    newEntry.setAmount(23);
    newEntry.setUnit('kg');
    newEntry.setUserId(2);
    newEntry.setModificationDate('2020-07-03 00:00:00');
    newEntry.setRetailerId(1);
    newEntry.setShoppingListId(2);
    console.log(newEntry);
    ShoppingAPI.getAPI()
      .addEntry(newEntry)
      .catch((e) => {
        console.info(e);
      });
  };

  createShoppingList = () => {
    const newList = new ShoppingListBO();
    newList.setName('Wocheneinkauf');
    newList.setGroupId(3);
    console.log(newEntry);
    ShoppingAPI.getAPI()
      .addShoppingList(newEntry)
      .catch((e) => {
        console.info(e);
      });
  };

  // updateShoppingList = () => {
  //   const updatedShoppingList = this.state.lists;
  //   console.log(updatedEntry[0]);
  //   updatedEntry[0].setArticle('Bier');
  //   ShoppingAPI.getAPI().updateEntry(updatedEntry[0]);
  // };
  // deleteShoppingList
  // deleteListEntry

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
    this.getFavoritesByGroup();
    this.getEntriesByShoppingList();
  }

  render() {
    return (
      <Button onClick={this.updateEntrys}>Let the testing begin!</Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
