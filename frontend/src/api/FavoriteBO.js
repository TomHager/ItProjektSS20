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
