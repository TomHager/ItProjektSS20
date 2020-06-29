import GroupBO from "./GroupBO";
import ShoppingListBO from "./ShoppingListBO";
import EntryBO from "./EntryBO";

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 */
export default class BankAPI {
  // Singelton instance
  static #api = null;

  // Local Python backend
  //   #shoppingListServerBaseURL = "/shoppingList";

  // Local http-fake-backend
  #shoppingListServerBaseURL = "/api/shoppingList";

  // #currencyFormatter = new Intl.NumberFormat('de-DE', {
  //     style: 'currency',
  //     currency: 'EUR'
  // });

  // #currency = '€';

  // Group related
  #getGroupsURL = () => `${this.#shoppingListServerBaseURL}/groups`;
  #addGroupURL = () => `${this.#shoppingListServerBaseURL}/groups`;
  #getGroupURL = (id) => `${this.#shoppingListServerBaseURL}/groups/${id}`;
  #updateGroupURL = (id) => `${this.#shoppingListServerBaseURL}/groups/${id}`;
  #deleteGroupURL = (id) => `${this.#shoppingListServerBaseURL}/groups/${id}`;
  #searchGroupURL = (customerName) =>
    `${this.#shoppingListServerBaseURL}/groups-by-name/${customerName}`;

  // ShoppingList related
  //   #getAllAccountsURL = () => `${this.#shoppingListServerBaseURL}/accounts`;
  //   #getAccountsForCustomerURL = (id) =>
  //     `${this.#shoppingListServerBaseURL}/groups/${id}/accounts`;
  //   #addAccountsForCustomerURL = (id) =>
  //     `${this.#shoppingListServerBaseURL}/groups/${id}/accounts`;
  //   #getBalanceForAccountURL = (id) =>
  //     `${this.#shoppingListServerBaseURL}/accounts/${id}/balance`;
  //   #deleteAccountIdURL = (id) =>
  //     `${this.#shoppingListServerBaseURL}/accounts/${id}`;

  // Transaction related
  // #getCreditsForAccountIdURL = (id) => `${this.#shoppingListServerBaseURL}/account/${id}/credits`;
  // #getDebitsForAccountIdURL = (id) => `${this.#shoppingListServerBaseURL}/account/${id}/debits`;
  // #addTransactionURL = () => `${this.#shoppingListServerBaseURL}/transactions`;

  /**
   * Get the Singelton instance
   *
   * @public
   */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new ShoppingListAPI();
    }
    return this.#api;
  }

  /**
   *  Returns a Promise which resolves to a json object.
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
   *  fetchAdvanced throws an Error also an server status errors
   */
  #fetchAdvanced = (url, init) =>
    fetch(url, init).then((res) => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });

  /**
   * Returns a formatter to format currencys of the transactions
   *
   * @public
   */
  // getCurrencyFormatter() {
  //     return this.#currencyFormatter;
  // }

  /**
   * Returns the code for the currency
   *
   * @public
   */
  // getCurrency() {
  //     return this.#currency;
  // }

  /**
   * Returns a Promise, which resolves to an Array of GroupBOs
   *
   * @public
   */
  getGroups() {
    return this.#fetchAdvanced(this.#getGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
      // console.info(groupBOs);
      return new Promise(function (resolve) {
        resolve(groupBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a GroupBO
   *
   * @param {Number} groupID to be retrieved
   * @public
   */
  getGroup(groupID) {
    return this.#fetchAdvanced(this.#getGroupURL(groupID)).then(
      (responseJSON) => {
        // We always get an array of GroupBOs.fromJSON, but only need one object
        let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
        // console.info(responseGroupBO);
        return new Promise(function (resolve) {
          resolve(responseGroupBO);
        });
      }
    );
  }
}
