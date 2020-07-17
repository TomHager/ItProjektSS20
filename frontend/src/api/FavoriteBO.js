import BusinessObject from './BusinessObject';

/**
 * @author Dimitrios Apazidis
 * @author Christoph Kunz
 */

export default class ShoppingListBO extends BusinessObject {

}
  constructor(unit, amount, article) {
    super();
    this.unit = unit;
    this.amount = amount;
    this.article = article;

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


// Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(favorite) {
    let result = [];

    if (Array.isArray(favorite) {
      favorite.forEach((c) => {
        Object.setPrototypeOf(c, FavoriteBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = favorite;
      Object.setPrototypeOf(c, FavoriteBO.prototype);
      result.push(c);
    }