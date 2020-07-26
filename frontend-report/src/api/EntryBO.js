import BusinessObject from './BusinessObject';

/**
 * @author Tom Hager
 */

export default class EntryBO extends BusinessObject {
  constructor(
    unit,
    amount,
    article,
    modificationDate,
    userId,
    retailerId,
    shoppingListId,
    groupId,
    bought
  ) {
    super();
    this.unit = unit;
    this.amount = amount;
    this.article = article;
    this.modification_date = modificationDate;
    this.user_id = userId;
    this.retailer_id = retailerId;
    this.shopping_list_id = shoppingListId;
    this.group_id = groupId;
    this.bought = bought;
  }

  getUnit() {
    return this.unit;
  }

  setUnit(unit) {
    this.unit = unit;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  getArticle() {
    return this.article;
  }

  setArticle(article) {
    this.article = article;
  }

  getModificationDate() {
    return this.modification_date;
  }

  setModificationDate(modificationDate) {
    this.modification_date = modificationDate;
  }

  getUserId() {
    return this.user_id;
  }

  setUserId(userId) {
    this.user_id = userId;
  }

  getRetailerId() {
    return this.retailer_id;
  }

  setRetailerId(retailerId) {
    this.retailer_id = retailerId;
  }

  getShoppingListId() {
    return this.shopping_list_id;
  }

  setShoppingListId(shoppingListId) {
    this.shopping_list_id = shoppingListId;
  }

  getGroupId() {
    return this.group_id;
  }

  setGroupId(groupId) {
    this.group_id = groupId;
  }

  getBought() {
    return this.bought;
  }

  setBought(bought) {
    this.bought = bought;
  }

  /*
    Nutzungsmöglichkeit:

        let outputHTML = '';
        customers = Customer.fromJSON(this.responseText);
        customers.forEach((c) => {
            outputHTML += '<div class='customer'>' + c.getFirstName() + ' ' + c.getLastName() + '</div>';
        });

    */

  // Returns an Array of EntryBOs from a given JSON structure
  static fromJSON(entries) {
    let result = [];

    if (Array.isArray(entries)) {
      entries.forEach((c) => {
        Object.setPrototypeOf(c, EntryBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = entries;
      Object.setPrototypeOf(c, EntryBO.prototype);
      result.push(c);
    }

    return result;
  }
}
