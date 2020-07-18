import BusinessObject from './BusinessObject';

/**
 * @author Tom Hager
 */

export default class RetailerBO extends BusinessObject {
  constructor(name) {
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
  static fromJSON(retailers) {
    let result = [];

    if (Array.isArray(retailers)) {
      retailers.forEach((c) => {
        Object.setPrototypeOf(c, RetailerBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = retailers;
      Object.setPrototypeOf(c, RetailerBO.prototype);
      result.push(c);
    }

    return result;
  }
}
