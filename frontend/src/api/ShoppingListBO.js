import BusinessObject from './BusinessObject';

/**
 * @author Dimitrios Apazidis
 */

export default class ShoppingListBO extends BusinessObject {
  constructor(name, groupId) {
    super();
    this.name = name;
    this.groups_id = groupId;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getGroupId() {
    return this.groups_id;
  }

  setGroupId(groupId) {
    this.groups_id = groupId;
  }

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(shoppingLists) {
    let result = [];

    if (Array.isArray(shoppingLists)) {
      shoppingLists.forEach((c) => {
        Object.setPrototypeOf(c, ShoppingListBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = shoppingLists;
      Object.setPrototypeOf(c, ShoppingListBO.prototype);
      result.push(c);
    }

    return result;
  }
}
