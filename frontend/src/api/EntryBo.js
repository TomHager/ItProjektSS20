import BusinessObject from "./BusinessObject";

export default class EntryBO extends BusinessObject {
  constructor(
    bought,
    unit,
    amount,
    articleId,
    articleName,
    articleStandard,
    modificationDate
  ) {
    super();
    this.bought = bought;
    this.unit = unit;
    this.amount = amount;
    this.article_id = articleId;
    this.article_name = articleName;
    this.article_standard = articleStandard;
    this.modification_date = modificationDate;
  }
  
  getID() {
      return this.id;
  }

  getBought() {
    return this.bought;
  }

  setBought(bought) {
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

  getArticleId() {
    return this.article_id;
  }

  setArticleId(articleId) {
    this.article_id = articleId;
  }

  getArticleName() {
    return this.article_name;
  }

  setArticleName(articleName) {
    this.article_name = articleName;
  }

  getArticleStandard() {
    return this.article_standard;
  }

  setArticleStandard(articleStandard) {
    this.article_standard = articleStandard;
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
