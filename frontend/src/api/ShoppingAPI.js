import EntryBO from './EntryBO';
// import FavoriteBO from './FavoriteBO';
import GroupBO from './GroupBO';
// import GroupMembershipBO from './GroupMembershipBO';
// import RetailerBO from './RetailerBO';
// import RetailerEntryListBO from './RetailerEntryListBO';
// import RetailerGroupBO from './RetailerGroupBO';
// import ShoppingListBO from './ShoppingListBO';
import UserBO from './UserBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author Tom Hager
 * @author Dimitrios Apazidis
 */

export default class ShoppingAPI {
  // Singelton instance
  static #api = null;

  #ShoppingServerBaseURL = 'http://desktop-du328lq:8081/api/iKauf/';

  // Entries related
  #getEntriesURL = () => `${this.#ShoppingServerBaseURL}/entries`;
  #getEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
  #addEntryURL = () => `${this.#ShoppingServerBaseURL}/entries`;
  #updateEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
  #deleteEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
  #searchEntryByAmount = (amount) => `${this.#ShoppingServerBaseURL}/entries-by-name/${amount}`;
  #searchEntryByArticleURL = (articleName) => `${this.#ShoppingServerBaseURL}/entry-by-article/${articleName}`;
  #searchEntryByRetailerEntryList = (retailerEntryList) => `${this.#ShoppingServerBaseURL}/entry-by-retailer-entry-list/${retailerEntryList}`;

  // Favorites related
  #getFavoritesURL = () => `${this.#ShoppingServerBaseURL}/favorites`;
  #getFavoriteURL = (id) => `${this.#ShoppingServerBaseURL}/favorites/${id}`;
  #addFavoriteURL = () => `${this.#ShoppingServerBaseURL}/favorites`;
  #updateFavoriteURL = (id) => `${this.#ShoppingServerBaseURL}/favorites/${id}`;
  #deleteFavoriteURL = (id) => `${this.#ShoppingServerBaseURL}/favorites/${id}`;

  // Groups related
  #getGroupsURL = () => `${this.#ShoppingServerBaseURL}/groups`;
  #getGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;
  #addGroupURL = () => `${this.#ShoppingServerBaseURL}/groups`;
  #updateGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;
  #deleteGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;

  // GroupMemberships related
  #getGroupMembershipsURL = () => `${this.#ShoppingServerBaseURL}/groupMemberships`;
  #getGroupMembershipURL = (id) =>
    `${this.#ShoppingServerBaseURL}/groupMemberships/${id}`;
  #addGroupMembershipURL = () => `${this.#ShoppingServerBaseURL}/groupMemberships`;
  #updateGroupMembershipURL = (id) =>
    `${this.#ShoppingServerBaseURL}/groupMemberships/${id}`;
  #deleteGroupMembershipURL = (id) =>
    `${this.#ShoppingServerBaseURL}/groupMemberships/${id}`;

  // Retailers related
  #getRetailersURL = () => `${this.#ShoppingServerBaseURL}/retailers`;
  #getRetailerURL = (id) => `${this.#ShoppingServerBaseURL}/retailers/${id}`;
  #addRetailerURL = () => `${this.#ShoppingServerBaseURL}/retailers`;
  #updateRetailerURL = (id) => `${this.#ShoppingServerBaseURL}/retailers/${id}`;
  #deleteRetailerURL = (id) => `${this.#ShoppingServerBaseURL}/retailers/${id}`;

  // RetailerEntryLists related
  #getRetailerEntryListsURL = () => `${this.#ShoppingServerBaseURL}/retailerEntryLists`;
  #getRetailerEntryListURL = (id) =>
    `${this.#ShoppingServerBaseURL}/retailerEntryLists/${id}`;
  #addRetailerEntryListURL = () => `${this.#ShoppingServerBaseURL}/retailerEntryLists`;
  #updateRetailerEntryListURL = (id) =>
    `${this.#ShoppingServerBaseURL}/retailerEntryLists/${id}`;
  #deleteRetailerEntryListURL = (id) =>
    `${this.#ShoppingServerBaseURL}/retailerEntryLists/${id}`;

  // RetailerGroups related
  #getRetailerGroupsURL = () => `${this.#ShoppingServerBaseURL}/retailerGroups`;
  #getRetailerGroupURL = (id) => `${this.#ShoppingServerBaseURL}/retailerGroups/${id}`;
  #addRetailerGroupURL = () => `${this.#ShoppingServerBaseURL}/retailerGroups`;
  #updateRetailerGroupURL = (id) => `${this.#ShoppingServerBaseURL}/retailerGroups/${id}`;
  #deleteRetailerGroupURL = (id) => `${this.#ShoppingServerBaseURL}/retailerGroups/${id}`;

  // ShoppingLists related
  #getShoppingListsURL = () => `${this.#ShoppingServerBaseURL}/shoppingLists`;
  #getShoppingListURL = (id) => `${this.#ShoppingServerBaseURL}/shoppingLists/${id}`;
  #addShoppingListURL = () => `${this.#ShoppingServerBaseURL}/shoppingLists`;
  #updateShoppingListURL = (id) => `${this.#ShoppingServerBaseURL}/shoppingLists/${id}`;
  #deleteShoppingListURL = (id) => `${this.#ShoppingServerBaseURL}/shoppingLists/${id}`;

  // User related
  #getUsersURL = () => `${this.#ShoppingServerBaseURL}/users`;
  #getUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
  #addUserURL = () => `${this.#ShoppingServerBaseURL}/users`;
  #updateUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
  #deleteUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
  #searchUserByName = (userEmail) => `${this.#ShoppingServerBaseURL}/user-by-email/${userEmail}`;
  #searchUserByEmail = (userName) => `${this.#ShoppingServerBaseURL}/user-by-name/${userName}`;



  static getAPI() {
    if (this.#api == null) {
      this.#api = new ShoppingAPI();
    }
    return this.#api;
  }

  #fetchAdvanced = (url, init) =>
    fetch(url, init).then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });

  // Entry Methoden
  getEntries() {
    return this.#fetchAdvanced(this.#getEntriesURL()).then((responseJSON) => {
      let entryBOs = EntryBO.fromJSON(responseJSON);
      // console.info(entryBOs);
      return new Promise(function (resolve) {
        resolve(entryBOs);
      });
    });
  }

  getEntry(entryId) {
    return this.#fetchAdvanced(this.#getEntryURL(entryId)).then((responseJSON) => {
      // We always get an array of EntryBOs.fromJSON, but only need one object
      let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
      // console.info(responseEntryBO);
      return new Promise(function (resolve) {
        resolve(responseEntryBO);
      });
    });
  }

  addEntry(entryBO) {
    return this.#fetchAdvanced(this.#addEntryURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(entryBO),
    }).then((responseJSON) => {
      // We always get an array of EntryBO.fromJSON, but only need one object
      let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
      // console.info(entryBOs);
      return new Promise(function (resolve) {
        resolve(responseEntryBO);
      });
    });
  }

  updateEntry(entryBO) {
    return this.#fetchAdvanced(this.#updateEntryURL(entryBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(entryBO),
    }).then((responseJSON) => {
      // We always get an array of EntryBOs.fromJSON
      let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
      // console.info(entryBOs);
      return new Promise(function (resolve) {
        resolve(responseEntryBO);
      });
    });
  }

deleteEntry(entryId) {
    return this.#fetchAdvanced(this.#deleteEntryURL(entryId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of EntryBO.fromJSON
      let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
      // console.info(entryBOs);
      return new Promise(function (resolve) {
        resolve(responseEntryBO);
      });
    });
  }

searchEntryByArticle(articleName) {
     return this.#fetchAdvanced(this.#searchEntryByArticleURL(articleName)).then((responseJSON) => {
         let entryBOBO = entryBOBO.fromJSON(responseJSON);
         // console.info(entryBOs);
         return new Promise(function (resolve) {
             resolve(entryBOs);
         })
     })
}

searchEntryByRetailerEntryList(retailerEntryList) {
     return this.#fetchAdvanced(this.#searchEntryByRetailerEntryListURL(retailerEntryList)).then((responseJSON) => {
         let entryBOBO = entryBOBO.fromJSON(responseJSON);
         // console.info(entryBOs);
         return new Promise(function (resolve) {
             resolve(entryBOs);
         })
     })
}

searchEntryByAmount(amount) {
     return this.#fetchAdvanced(this.#searchEntryByAmountURL(amount)).then((responseJSON) => {
         let entryBOBO = entryBOBO.fromJSON(responseJSON);
         // console.info(entryBOs);
         return new Promise(function (resolve) {
             resolve(entryBOs);
         })
     })
}


  // Group Methoden

  getGroups() {
    return this.#fetchAdvanced(this.#getGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
      // console.info(GroupBOs);
      return new Promise(function (resolve) {
        resolve(groupBOs);
      });
    });
  }

  getGroup(groupId) {
    return this.#fetchAdvanced(this.#getGroupURL(groupId)).then((responseJSON) => {
      // We always get an array of GroupBO.fromJSON, but only need one object
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      // console.info(responseGroupBO);
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      });
    });
  }

  addGroup(groupBO) {
    return this.#fetchAdvanced(this.#addGroupURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupBO),
    }).then((responseJSON) => {
      // We always get an array of GroupBO.fromJSON, but only need one object
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      // console.info(groupBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      });
    });
  }

  updateGroup(groupBO) {
    return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupBO),
    }).then((responseJSON) => {
      // We always get an array of GroupBO.fromJSON
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      // console.info(groupBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      });
    });
  }

  deleteGroup(groupId) {
    return this.#fetchAdvanced(this.#deleteGroupURL(groupId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of GroupBO.fromJSON
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      // console.info(groupBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      });
    });
  }

  // User Methoden
  getUsers() {
    return this.#fetchAdvanced(this.#getUsersURL()).then((responseJSON) => {
      let userBOs = UserBO.fromJSON(responseJSON);
      // console.info(userBOs);
      return new Promise(function (resolve) {
        resolve(userBOs);
      });
    });
  }

  getUser(userId) {
    return this.#fetchAdvanced(this.#getUserURL(userId)).then((responseJSON) => {
      // We always get an array of UserBOs.fromJSON, but only need one object
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      // console.info(responseUseryBO);
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }

  addUser(userBO) {
    return this.#fetchAdvanced(this.#addUserURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userBO),
    }).then((responseJSON) => {
      // We always get an array of UserBO.fromJSON, but only need one object
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      // console.info(userBOs);
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }

  updateUser(userBO) {
    return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userBO),
    }).then((responseJSON) => {
      // We always get an array of UserBOs.fromJSON
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      // console.info(userBOs);
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }

  deleteUser(userId) {
    return this.#fetchAdvanced(this.#deleteUserURL(userId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of UserBO.fromJSON
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      // console.info(userBOs);
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }
}

searchUserByName(userName) {
     return this.#fetchAdvanced(this.#searchUserByNameURL(userName)).then((responseJSON) => {
         let userBO = userBO.fromJSON(responseJSON);
         // console.info(userBOs);
         return new Promise(function (resolve) {
             resolve(userBOs);
         })
     })
}

searchUserByEmail(userEmail) {
     return this.#fetchAdvanced(this.#searchUserByEmailURL(userId)).then((responseJSON) => {
         let userBO = userBO.fromJSON(responseJSON);
         // console.info(userBOs);
         return new Promise(function (resolve) {
             resolve(userBOs);
         })
     })
}


// ShoppingList Methoden


  getShoppingLists() {
    return this.#fetchAdvanced(this.#getShoppingListsURL()).then((responseJSON) => {
      let shoppingListBOs = ShoppingListBO.fromJSON(responseJSON);
      // console.info(shoppingListBOs);
      return new Promise(function (resolve) {
        resolve(shoppingListBOs);
      });
    });
  }

  getShoppingList(shoppingListId) {
    return this.#fetchAdvanced(this.#getShoppingListURL(shoppingListId)).then((responseJSON) => {
      // We always get an array of ShoppingListBOs.fromJSON, but only need one object
      let responseShoppingListBO = ShoppingListBO.fromJSON(responseJSON)[0];
      // console.info(responseShoppingListBO);
      return new Promise(function (resolve) {
        resolve(responseShoppingListBO);
      });
    });
  }

  addShoppingList(shoppingListBO) {
    return this.#fetchAdvanced(this.#addShoppingListURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(shoppingListBO),
    }).then((responseJSON) => {
      // We always get an array of ShoppingListBO.fromJSON, but only need one object
      let responseShoppingListBO = ShoppingListBO.fromJSON(responseJSON)[0];
      // console.info(shoppingListBOs);
      return new Promise(function (resolve) {
        resolve(responseShoppingListBO);
      });
    });
  }

  updateShoppingList(shoppingListBO) {
    return this.#fetchAdvanced(this.#updateShoppingListURL(shoppingListBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(shoppingListBO),
    }).then((responseJSON) => {
      // We always get an array of ShoppingListBOs.fromJSON
      let responseShoppingListBO = ShoppingListBO.fromJSON(responseJSON)[0];
      // console.info(shoppingListBOs);
      return new Promise(function (resolve) {
        resolve(responseShoppingListBO);
      });
    });
  }

  deleteShoppingList(shoppingListId) {
    return this.#fetchAdvanced(this.#deleteShoppingListURL(shoppingListId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of ShoppingListBO.fromJSON
      let responseShoppingListBO = ShoppingListBO.fromJSON(responseJSON)[0];
      // console.info(shoppingListBOs);
      return new Promise(function (resolve) {
        resolve(responseShoppingListBO);
      });
    });
  }
}

// Retailer Methoden


  getRetailers() {
    return this.#fetchAdvanced(this.#getRetailersURL()).then((responseJSON) => {
      let retailerBOs = RetailerBO.fromJSON(responseJSON);
      // console.info(retailerBOs);
      return new Promise(function (resolve) {
        resolve(retailerBOs);
      });
    });
  }

  getRetailer(retailerId) {
    return this.#fetchAdvanced(this.#getRetailerURL(retailerId)).then((responseJSON) => {
      // We always get an array of RetailerBOs.fromJSON, but only need one object
      let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
      // console.info(responseRetailer  BO);
      return new Promise(function (resolve) {
        resolve(responseRetailerBO);
      });
    });
  }

  addRetailer(RetailerBO) {
    return this.#fetchAdvanced(this.#addRetailerURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(retailerBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerBO.fromJSON, but only need one object
      let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
      // console.info(retailerBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerBO);
      });
    });
  }

  updateRetailer(retailerBO) {
    return this.#fetchAdvanced(this.#updateRetailerURL(retailerBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(RetailerBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerBOs.fromJSON
      let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
      // console.info(retailerBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerBO);
      });
    });
  }

  deleteRetailer(retailerId) {
    return this.#fetchAdvanced(this.#deleteRetailerURL(retailerId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of RetailerBO.fromJSON
      let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
      // console.info(retailerBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerBO);
      });
    });
  }
}


// Favorite Methoden


  getFavorites() {
    return this.#fetchAdvanced(this.#getFavoritesURL()).then((responseJSON) => {
      let favoriteBOs = FavoriteBO.fromJSON(responseJSON);
      // console.info(favoriteBOs);
      return new Promise(function (resolve) {
        resolve(favoriteBOs);
      });
    });
  }

  getFavorite(favoriteId) {
    return this.#fetchAdvanced(this.#getFavoriteURL(favoriteId)).then((responseJSON) => {
      // We always get an array of FavoriteBOs.fromJSON, but only need one object
      let responseFavoriteBO = FavoriteBO.fromJSON(responseJSON)[0];
      // console.info(responseFavoriteBO);
      return new Promise(function (resolve) {
        resolve(responseFavoriteBO);
      });
    });
  }

  addFavorite(favoriteBO) {
    return this.#fetchAdvanced(this.#addFavoriteURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(favoriteBO),
    }).then((responseJSON) => {
      // We always get an array of FavoriteBO.fromJSON, but only need one object
      let responseFavoriteBO = FavoriteBO.fromJSON(responseJSON)[0];
      // console.info(favoriteBOs);
      return new Promise(function (resolve) {
        resolve(responseFavoriteBO);
      });
    });
  }

  updateFavorite(favoriteBO) {
    return this.#fetchAdvanced(this.#updateFavoriteURL(favoriteBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(favoriteBO),
    }).then((responseJSON) => {
      // We always get an array of FavoriteBOs.fromJSON
      let responseFavoriteBO = FavoriteBO.fromJSON(responseJSON)[0];
      // console.info(favoriteBOs);
      return new Promise(function (resolve) {
        resolve(responseFavoriteBO);
      });
    });
  }

  deleteFavorite(favoriteId) {
    return this.#fetchAdvanced(this.#deleteFavoriteURL(favoriteId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of FavoriteBO.fromJSON
      let responseFavoriteBO = FavoriteBO.fromJSON(responseJSON)[0];
      // console.info(favoriteBOs);
      return new Promise(function (resolve) {
        resolve(responseFavoriteBO);
      });
    });
  }
}


// GroupMemberShip Methoden


  getGroupMemberShips() {
    return this.#fetchAdvanced(this.#getGroupMemberShipsURL()).then((responseJSON) => {
      let groupMemberShipBOs = GroupMemberShipBO.fromJSON(responseJSON);
      // console.info(groupMemberShipBOs);
      return new Promise(function (resolve) {
        resolve(groupMemberShipBOs);
      });
    });
  }

  getGroupMemberShip(groupMemberShipId) {
    return this.#fetchAdvanced(this.#getGroupMemberShipURL(groupMemberShipId)).then((responseJSON) => {
      // We always get an array of GroupMemberShipBOs.fromJSON, but only need one object
      let responseGroupMemberShipBO = GroupMemberShipBO.fromJSON(responseJSON)[0];
      // console.info(responseGroupMemberShip  BO);
      return new Promise(function (resolve) {
        resolve(responseGroupMemberShipBO);
      });
    });
  }

  addGroupMemberShip(GroupMemberShipBO) {
    return this.#fetchAdvanced(this.#addGroupMemberShipURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json   , text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupMemberShipBO),
    }).then((responseJSON) => {
      // We always get an array of GroupMemberShipBO.fromJSON, but only need one object
      let responseGroupMemberShipBO = GroupMemberShipBO.fromJSON(responseJSON)[0];
      // console.info(groupMemberShipBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupMemberShipBO);
      });
    });
  }

  updateGroupMemberShip(groupMemberShipBO) {
    return this.#fetchAdvanced(this.#updateGroupMemberShipURL(groupMemberShipBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupMemberShipBO),
    }).then((responseJSON) => {
      // We always get an array of GroupMemberShipBOs.fromJSON
      let responseGroupMemberShipBO = GroupMemberShipBO.fromJSON(responseJSON)[0];
      // console.info(groupMemberShipBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupMemberShipBO);
      });
    });
  }

  deleteGroupMemberShip(groupMemberShipId) {
    return this.#fetchAdvanced(this.#deleteGroupMemberShipURL(groupMemberShipId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of GroupMemberShipBO.fromJSON
      let responseGroupMemberShipBO = GroupMemberShipBO.fromJSON(responseJSON)[0];
      // console.info(groupMemberShipBOs);
      return new Promise(function (resolve) {
        resolve(responseGroupMemberShipBO);
      });
    });
  }
}


// RetailerGroup Methoden


  getRetailerGroups() {
    return this.#fetchAdvanced(this.#getRetailerGroupsURL()).then((responseJSON) => {
      let RetailerGroupBOs = RetailerGroupBO.fromJSON(responseJSON);
      // console.info(retailerGroupBOs);
      return new Promise(function (resolve) {
        resolve(retailerGroupBOs);
      });
    });
  }

  getRetailerGroup(retailerGroupId) {
    return this.#fetchAdvanced(this.#getRetailerGroupURL(retailerGroupId)).then((responseJSON) => {
      // We always get an array of RetailerGroupBOs.fromJSON, but only need one object
      let responseRetailerGroupBO = RetailerGroupBO.fromJSON(responseJSON)[0];
      // console.info(responseRetailerGroup  BO);
      return new Promise(function (resolve) {
        resolve(responseRetailerGroupBO);
      });
    });
  }

  addRetailerGroup(retailerGroupBO) {
    return this.#fetchAdvanced(this.#addRetailerGroupURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(RetailerGroupBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerGroupBO.fromJSON, but only need one object
      let responseRetailerGroupBO = RetailerGroupBO.fromJSON(responseJSON)[0];
      // console.info(retailerGroupBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerGroupBO);
      });
    });
  }

  updateRetailerGroup(retailerGroupBO) {
    return this.#fetchAdvanced(this.#updateRetailerGroupURL(retailerGroupBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(retailerGroupBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerGroupBOs.fromJSON
      let responseRetailerGroupBO = RetailerGroupBO.fromJSON(responseJSON)[0];
      // console.info(retailerGroupBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerGroupBO);
      });
    });
  }

  deleteRetailerGroup(retailerGroupId) {
    return this.#fetchAdvanced(this.#deleteRetailerGroupURL(RetailerGroupId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of RetailerGroupBO.fromJSON
      let responseRetailerGroupBO = RetailerGroupBO.fromJSON(responseJSON)[0];
      // console.info(retailerGroupBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerGroupBO);
      });
    });
  }
}


// RetailerEntryList Methoden


  getRetailerEntryLists() {
    return this.#fetchAdvanced(this.#getRetailerEntryListsURL()).then((responseJSON) => {
      let retailerEntryListBOs = RetailerEntryListBO.fromJSON(responseJSON);
      // console.info(retailerEntryListBOs);
      return new Promise(function (resolve) {
        resolve(retailerEntryListBOs);
      });
    });
  }

  getRetailerEntryList(retailerEntryListId) {
    return this.#fetchAdvanced(this.#getRetailerEntryListURL(retailerEntryListId)).then((responseJSON) => {
      // We always get an array of RetailerEntryListBOs.fromJSON, but only need one object
      let responseRetailerEntryListBO = RetailerEntryListBO.fromJSON(responseJSON)[0];
      // console.info(responseRetailerEntryList  BO);
      return new Promise(function (resolve) {
        resolve(responseRetailerEntryListBO);
      });
    });
  }

  addRetailerEntryList(retailerEntryListBO) {
    return this.#fetchAdvanced(this.#addRetailerEntryListURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(retailerEntryListBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerEntryListBO.fromJSON, but only need one object
      let responseRetailerEntryListBO = RetailerEntryListBO.fromJSON(responseJSON)[0];
      // console.info(retailerEntryListBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerEntryListBO);
      });
    });
  }

  updateRetailerEntryList(retailerEntryListBO) {
    return this.#fetchAdvanced(this.#updateRetailerEntryListURL(retailerEntryListBO.getID()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(RetailerEntryListBO),
    }).then((responseJSON) => {
      // We always get an array of RetailerEntryListBOs.fromJSON
      let responseRetailerEntryListBO = RetailerEntryListBO.fromJSON(responseJSON)[0];
      // console.info(retailerEntryListBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerEntryListBO);
      });
    });
  }

  deleteRetailerEntryList(retailerEntryListId) {
    return this.#fetchAdvanced(this.#deleteRetailerEntryListURL(retailerEntryListId), {
      method: 'DELETE',
    }).then((responseJSON) => {
      // We always get an array of RetailerEntryListBO.fromJSON
      let responseRetailerEntryListBO = RetailerEntryListBO.fromJSON(responseJSON)[0];
      // console.info(retailerEntryListBOs);
      return new Promise(function (resolve) {
        resolve(responseRetailerEntryListBO);
      });
    });
  }
}















