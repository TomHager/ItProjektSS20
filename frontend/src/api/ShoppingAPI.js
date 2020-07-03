// import EntryBo from "./EntryBo";


// export default class ShoppingAPI {
//     // Singelton instance
//     static #api = null;

//     #ShoppingServerBaseURL = "http://desktop-du328lq:8081/api/iKauf/"

//     // Entries related
//     #getEntriesURL = () => `${this.#ShoppingServerBaseURL}/entries`;
//     #getEntryURL = () => `${this.#ShoppingServerBaseURL}/entry/id`;
    
//     static getAPI() {
//         if (this.#api == null) {
//             this.#api = new ShoppingAPI();
//         }
//         return this.#api;
//     }

//     #fetchAdvanced = (url, init) => fetch(url, init)
//         .then(res => {
//             if (!res.ok) {
//                 throw Error(`${res.status} ${res.statusText}`);
//             }
//             return res.json();
//         }
//     )

//     getEntries() {
//         return this.#fetchAdvanced(this.#getEntriessURL()).then((responseJSON) => {
//             let entryBos = EntryBo.fromJSON(responseJSON);
//             // console.info(entryBOs);
//             return new Promise(function (resolve) {
//                 resolve(entryBos);
//             })
//         })
//     }

//     getEntry(entryId) {
//         return this.#fetchAdvanced(this.#getEntryURL(entryId)).then((responseJSON) => {
//             // We always get an array of EntryBOs.fromJSON, but only need one object
//             let responseEntryBo = EntryBo.fromJSON(responseJSON)[0];
//             // console.info(responseEntryBO);
//             return new Promise(function (resolve) {
//                 resolve(responseEntryBo);
//             })
//         })
//     }

//     addEntry(entryBo) {
//         return this.#fetchAdvanced(this.#getEntriesURL(), {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json, text/plain',
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify(entryBo)
//         }).then((responseJSON) => {
//             // We always get an array of CustomerBOs.fromJSON, but only need one object
//             let responseEntryBo = CustomerBO.fromJSON(responseJSON)[0];
//             // console.info(accountBOs);
//             return new Promise(function (resolve) {
//                 resolve(responseEntryBo);
//             })
//         })
//     }

//     updateEntry(entryBo) {
//         return this.#fetchAdvanced(this.#getEntriesURL(entryBo.getID()), {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json, text/plain',
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify(entryBo)
//         }).then((responseJSON) => {
//             // We always get an array of EntryBOs.fromJSON
//             let responseEntryBo = EntryBo.fromJSON(responseJSON)[0];
//             // console.info(accountBOs);
//             return new Promise(function (resolve) {
//                 resolve(responseEntryBo);
//             })
//         })
//     }

//     deleteEntry(entryId) {
//         return this.#fetchAdvanced(this.#getEntriesURL(entryId), {
//             method: 'DELETE'
//         }).then((responseJSON) => {
//             // We always get an array of CustomerBOs.fromJSON
//             let responseEntryBo = EntryBo.fromJSON(responseJSON)[0];
//             // console.info(accountBOs);
//             return new Promise(function (resolve) {
//                 resolve(responseEntryBo);
//             })
//         })
//     }

// }

