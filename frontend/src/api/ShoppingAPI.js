import EntryBO from "./EntryBO";


export default class ShoppingAPI {
    // Singelton instance
    static #api = null;

    #ShoppingServerBaseURL = "http://desktop-du328lq:8081/api/iKauf/"

    // Entries related
    #getEntriesURL = () => `${this.#ShoppingServerBaseURL}/entries`;
    #getEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entry/${id}`;
    
    static getAPI() {
        if (this.#api == null) {
            this.#api = new ShoppingAPI();
        }
        return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

    getEntries() {
        return this.#fetchAdvanced(this.#getEntriesURL()).then((responseJSON) => {
            let entryBOs = EntryBO.fromJSON(responseJSON);
            // console.info(entryBOs);
            return new Promise(function (resolve) {
                resolve(entryBOs);
            })
        })
    }

    getEntry(entryId) {
        return this.#fetchAdvanced(this.#getEntryURL(entryId)).then((responseJSON) => {
            // We always get an array of EntryBOs.fromJSON, but only need one object
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(responseEntryBO);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    addEntry(entryBO) {
        return this.#fetchAdvanced(this.#getEntriesURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(entryBO)
        }).then((responseJSON) => {
            // We always get an array of EntryBO.fromJSON, but only need one object
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    updateEntry(entryBO) {
        return this.#fetchAdvanced(this.#getEntriesURL(entryBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(entryBO)
        }).then((responseJSON) => {
            // We always get an array of EntryBOs.fromJSON
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    deleteEntry(entryId) {
        return this.#fetchAdvanced(this.#getEntriesURL(entryId), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of EntryBO.fromJSON
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

}

