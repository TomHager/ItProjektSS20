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
import GroupBO from '../../api/GroupBO';

export default class Testing extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      error: null,
      user: null,
      GroupmemberShip: null,
      retailers: null,
      favorite: null,
      lists: null,
      entries: null,
      reportEntries: null,
      groups: null,
      allGroups: null,
      group: null,
    };
  }

  //User

  //Läuft
  getCurrUser = () => {
    console.log('Eingeloggter User:', firebase.auth().currentUser.displayName);
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((returnedUser) => {
        this.setState({ user: returnedUser });
      });
  };

  //Läuft
  getUserByEmail = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail('berndbernd')
      .then((returnedUser) => {
        return this.setState({ user: returnedUser });
      });
  };

  //Läuft
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

  //Läuft
  updateUser = () => {
    const newUser = this.state.user;
    newUser[0].setName('Nemesis');
    ShoppingAPI.getAPI().updateUser(newUser[0]);
    console.log(newUser);
  };

  //Läuft
  deleteUser = () => {
    ShoppingAPI.getAPI().deleteUser(5);
  };

  //Groupmembership + Groups

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

  deleteGroupMembership = () => {
    ShoppingAPI.getAPI().deleteGroupMembership(4, 3);
  };

  results = () => {
    console.log(this.state.GroupmemberShip);
  };

  //Läuft
  getGroupsByGroupId = () => {
    ShoppingAPI.getAPI()
      .getGroup(2)
      .then((result) => {
        this.setState({ groups: result });
        console.log(this.state.groups);
      });
  };

  getAllGroups = () => {
    ShoppingAPI.getAPI()
      .getGroups()
      .then((result) => {
        this.setState({ allGroups: result });
        console.log(this.state.allGroups);
      });
  };

  getGroupByName = () => {
    ShoppingAPI.getAPI()
      .searchGroupByName('Bravo')
      .then((result) => {
        this.setState({ group: result });
        console.log(this.state.group);
      });
  };

  createGroup = () => {
    const newGroup = new GroupBO();
    newGroup.setName('Gruppe 33');
    ShoppingAPI.getAPI()
      .addGroup(newGroup)
      .catch((e) => {
        console.info(e);
      });
  };

  //RetailerGroup

  //Läuft
  addRetailergroup = () => {
    const newMembership = new RetailerGroupBO();
    newMembership.setRetailerGroup(3);
    newMembership.setRetailerMember(9);
    // const newMembership = { member: 3, group_membership: 3 };
    console.log(newMembership);
    ShoppingAPI.getAPI()
      .addRetailerGroup(newMembership)
      .catch((e) => {
        console.info(e);
      });
  };

  deleteRetailerGroup = () => {
    ShoppingAPI.getAPI().deleteRetailerGroup(2, 1);
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
    newFavorite.setArticle('Erdbeeren');
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

  //Läuft
  deleteFavorite = () => {
    ShoppingAPI.getAPI().deleteFavorite(2);
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
        this.setState({ entries: result });
        console.log(this.state.entries);
      });
  };

  //Läuft
  getRetailersByGroup = () => {
    ShoppingAPI.getAPI()
      .searchRetailerMemberByGroup(2)
      .then((result) => {
        this.setState({ retailers: result });
        console.log(this.state.retailers);
      });
  };

  // Läuft
  getEntriesByShoppingListAndRetailer = () => {
    ShoppingAPI.getAPI()
      .searchEntryByShoppingListAndRetailer(3, 2)
      .then((result) => {
        this.setState({ entries: result });
        console.log(this.state.entries);
      });
  };

  // Läuft
  getUserByEntry = () => {
    ShoppingAPI.getAPI()
      .searchUserByEntry(3)
      .then((result) => {
        this.setState({ users: result });
        console.log(this.state.users);
      });
  };

  // Läuft
  updateEntrys = () => {
    const updatedEntry = this.state.entries;
    // updatedEntry[0].setAmount(100);
    updatedEntry[0].setID(updatedEntry[0].id);
    updatedEntry[0].setArticle(updatedEntry[0].article);
    updatedEntry[0].setAmount(updatedEntry[0].amount);
    updatedEntry[0].setUnit(updatedEntry[0].unit);
    updatedEntry[0].setModificationDate(updatedEntry[0].modification_date);
    updatedEntry[0].setUserId(updatedEntry[0].user_id); // Member responsible
    updatedEntry[0].setRetailerId(updatedEntry[0].retailer_id);
    updatedEntry[0].setShoppingListId(updatedEntry[0].shopping_list_id);
    updatedEntry[0].setGroupId(55);
    updatedEntry[0].setBought(0);
    this.test(updatedEntry[0]);
  };

  test = (entry) => {
    ShoppingAPI.getAPI().updateEntry(entry);
  };

  // Läuft
  createEntry = () => {
    const newEntry = new EntryBO();
    newEntry.setUnit('kg');
    newEntry.setAmount(23);
    newEntry.setArticle('Müsli');
    newEntry.setModificationDate('2020-07-03 00:00:00');
    newEntry.setUserId(4);
    newEntry.setRetailerId(1);
    newEntry.setShoppingListId(2);
    newEntry.setGroupId(3);
    newEntry.setBought(0);

    console.log(newEntry);
    ShoppingAPI.getAPI()
      .addEntry(newEntry)
      .catch((e) => {
        console.info(e);
      });
  };
  //Läuft
  createShoppingList = () => {
    const newList = new ShoppingListBO();
    newList.setName('Wocheneinkauf');
    newList.setGroupId(3);
    console.log(newList);
    ShoppingAPI.getAPI()
      .addShoppingList(newList)
      .catch((e) => {
        console.info(e);
      });
  };
  //Läuft
  updateShoppingList = () => {
    const updatedShoppingList = this.state.lists;
    updatedShoppingList[0].setName('BBQ Party');
    updatedShoppingList[0].setGroupId(2);
    console.log(updatedShoppingList[0]);
    ShoppingAPI.getAPI().updateShoppingList(updatedShoppingList[0]);
  };

  //Läuft
  deleteShoppingList = () => {
    ShoppingAPI.getAPI().deleteShoppingList(2);
  };

  //Läuft
  deleteListEntry = () => {
    ShoppingAPI.getAPI().deleteEntry(4);
  };

  //RetailerList

  //Läuft
  addRetailerToDatabase = () => {
    const newRetailer = new RetailerBO();
    newRetailer.setName('Lidl');
    ShoppingAPI.getAPI()
      .addRetailer(newRetailer)
      .catch((e) => {
        console.info(e);
      });
  };

  //Läuft
  deleteRetailer = () => {
    ShoppingAPI.getAPI().deleteRetailer(2);
  };

  // Reportgenerator
  getEntryByGroupAndModifticationDataFromAndModificationDataTo = () => {
    // const dateFrom = new Date('July 5, 2020');
    // const dateTo = new Date('July 15, 2020');
    const dateFrom = new Date('July 5, 2020 03:00:00').toISOString().substr(0, 19);
    const dateTo = new Date('July 20, 2020 03:00:00').toISOString().substr(0, 19);
    console.log(dateFrom);
    console.log(dateTo);
    // const reportValues = new ReportValuesBO();
    // reportValues.setGroupId(3);
    // reportValues.setModificationDateFrom('2020-07-05T01:00:00');
    // reportValues.setModificationDateTo('2020-07-20T01:00:00');
    ShoppingAPI.getAPI()
      .searchReportDataURL(3, dateFrom, dateTo)
      .then((result) => {
        this.setState({ reportEntries: result });
        console.log(this.state.reportEntries);
      });
  };

  componentDidMount() {
    // this.getUserByEmail();
    // this.getFavoritesByGroup();
    this.getEntriesByShoppingList();
    // this.getShoppingListsByGroup();
    this.getAllGroups();
  }

  render() {
    return (
      <Button onClick={this.deleteRetailerGroup}>Let the testing begin!</Button>
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="name" onChange={this.handleChange} />
      //   <input type="email" name="email" onChange={this.handleChange} />
      //   <input type="submit" value="Add user" />{' '}
      // </form>
    );
  }
}
