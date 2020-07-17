import BusinessObject from './BusinessObject';
/**
 * @author Erik Lebedkin
 *
 */

export default class RetailerGroupBO extends BusinessObject {
  constructor() {
    super();
    this.retailer_member = ""
    this.retailer_group = ""

  }

  setRetailerMember(retailer_member) {
    this.retailer_member = retailer_member
  }

  getRetailerMember() {
    return this.retailer_member
  }

  setRetailerGroup(retailer_group) {
    this.retailer_group = retailer_group
  }

  getRetailerGroup() {
    return this.retailer_group
  }

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(retailer_group) {
    let result = [];

    if (Array.isArray(retailer_group)) {
      retailer_group.forEach((c) => {
        Object.setPrototypeOf(c, RetailerGroupBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = retailer_group;
      Object.setPrototypeOf(c, RetailerGroupBO.prototype);
      result.push(c);
    }

    return result;
  }
}
