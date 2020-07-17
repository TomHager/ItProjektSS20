import BusinessObject from './BusinessObject';

/**
 * @author Dimitrios Apazidis
 * @author Christoph Kunz
 */

export default class ShoppingListBO extends BusinessObject {

}
  constructor(name, group_id) {
    super();
    this.name = name;
    this.group_id = group_id;

  }

  getName() {
  return this.name;

  }

  setName(name) {
    this.unit = name;
  }

  get_group_id() {
    return this.group_id;
  }

  set_group_id(group_id) {
    this.group_id = group_id;
  }

// Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(shoppingList) {
    let result = [];

    if (Array.isArray(shoppingList)) {
      shoppingList.forEach((c) => {
        Object.setPrototypeOf(c, ShoppingListBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = shoppingList;
      Object.setPrototypeOf(c, ShoppingListBO.prototype);
      result.push(c);
    }