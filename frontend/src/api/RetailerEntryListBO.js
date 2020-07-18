import BusinessObject from './BusinessObject';

/**
 * @author Tom Hager
 */

export default class RetailerEntryListBO extends BusinessObject {
  constructor(entryId, shoppinglistId, retailerId, userId) {
    super();
    this.entry_id = entryId;
    this.shopping_list_id = shoppinglistId;
    this.retailer_id = retailerId;
    this.user_id = userId;
  }

  getEntryId() {
    return this.entry_id;
  }

  setEntryId(entryId) {
    this.entry_id = entryId;
  }

  getShoppingListId() {
    return this.shopping_list_id;
  }

  setShoppingListId(shoppingListId) {
    this.shopping_list_id = shoppingListId;
  }
  
  getRetaileryId() {
    return this.retailer_id;
  }

  setRetailerId(retailerId) {
    this.retailer_id = retailerId;
  }
  
  getUserId() {
    return this.user_id;
  }

  setUserId(userId) {
    this.user_id = userId;
  }
  

  /*
    Nutzungsmöglichkeit:

        let outputHTML = '';
        customers = Customer.fromJSON(this.responseText);
        customers.forEach((c) => {
            outputHTML += '<div class='customer'>' + c.getFirstName() + ' ' + c.getLastName() + '</div>';
        });

    */

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(retailerEntryList) {
    let result = [];

    if (Array.isArray(retailerEntryList)) {
      retailerEntryList.forEach((c) => {
        Object.setPrototypeOf(c, RetailerEntryListBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = retailerEntryList;
      Object.setPrototypeOf(c, RetailerEntryListBO.prototype);
      result.push(c);
    }

    return result;
  }
}
