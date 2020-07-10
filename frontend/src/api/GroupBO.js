import BusinessObject from "./BusinessObject";

export default class GroupBO extends BusinessObject {
  constructor(
    name,
  ) {
    super();
    this.name = name;
  }
  
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
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
  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(groups)) {
      groups.forEach((c) => {
        Object.setPrototypeOf(c, GroupBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = groups;
      Object.setPrototypeOf(c, GroupBO.prototype);
      result.push(c);
    }

    return result;
  }
}
