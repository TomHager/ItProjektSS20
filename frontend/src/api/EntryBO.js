import BusinessObject from './BusinessObject';

/**
 * @author Tom Hager
 * @author Christoph Kunz
 */

export default class EntryBO extends BusinessObject {
  constructor(unit, amount, name, modificationDate) {
    super();
    this.unit = unit;
    this.amount = amount;
    this.name = name;
    this.modification_date = modificationDate;
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

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getModificationDate(modificationDate) {
    return this.modification_date;
  }

  setModificationDate(modificationDate) {
    this.modification_date = modificationDate;
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
