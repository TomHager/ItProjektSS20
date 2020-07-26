/**
 * @author Tom Hager
 */

export default class RetailerGroupBO {
  constructor(retailerMember, retailerGroup) {
    this.retailer_member = retailerMember;
    this.retailer_group = retailerGroup;
  }

  getRetailerMember() {
    return this.retailer_member;
  }

  setRetailerMember(retailerMember) {
    this.retailer_member = retailerMember;
  }

  getRetailerGroup() {
    return this.retailer_group;
  }

  setRetailerGroup(retailerGroup) {
    this.retailer_group = retailerGroup;
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
  static fromJSON(retailerGroups) {
    let result = [];

    if (Array.isArray(retailerGroups)) {
      retailerGroups.forEach((c) => {
        Object.setPrototypeOf(c, RetailerGroupBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = retailerGroups;
      Object.setPrototypeOf(c, RetailerGroupBO.prototype);
      result.push(c);
    }

    return result;
  }
}
