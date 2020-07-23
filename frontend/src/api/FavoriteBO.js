import BusinessObject from './BusinessObject';

/**
 * @author Dimitrios Apazidis
 */

export default class FavoriteBO extends BusinessObject {
  constructor(unit, amount, article) {
    super();
    this.unit = unit;
    this.amount = amount;
    this.article = article;
    this.retailer_id = retailer_id;
    this.group_id = group_id;
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
  getRetailerID() {
    return this.retailer_id;
  }

  setRetailerID(retailer_id) {
    this.retailer_id = retailer_id;
  }
  getGroupID() {
    return this.group_id;
  }

  setGroupID(group_id) {
    this.group_id = group_id;
  }

  // Returns an Array of FavoriteBOs from a given JSON structure
  static fromJSON(favorites) {
    let result = [];

    if (Array.isArray(favorites)) {
      favorites.forEach((c) => {
        Object.setPrototypeOf(c, FavoriteBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = favorites;
      Object.setPrototypeOf(c, FavoriteBO.prototype);
      result.push(c);
    }

    return result;
  }
}
