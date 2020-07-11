import EntryBO from "./EntryBO";
import GroupBO from "./GroupBO";
import UserBO from "./UserBO";

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 *
 * @author Tom Hager
 * @author Christoph Kunz
 *
 */

export default class ShoppingAPI {
    // Singelton instance
    static #api = null;

    #ShoppingServerBaseURL = "http://desktop-du328lq:8081/api/iKauf/"

    // Entries related
    #getEntriesURL = () => `${this.#ShoppingServerBaseURL}/entries`;
    #getEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
    #addEntryURL = () => `${this.#ShoppingServerBaseURL}/entries`;
    #updateEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
    #deleteEntryURL = (id) => `${this.#ShoppingServerBaseURL}/entries/${id}`;
    // #searchEntryURL = (articleName) => `${this.#ShoppingServerBaseURL}/entries-by-name/${articleName}`;

    // Groups related
    #getGroupsURL = () => `${this.#ShoppingServerBaseURL}/groups`;
    #getGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;
    #addGroupURL = () => `${this.#ShoppingServerBaseURL}/groups`;
    #updateGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;
    #deleteGroupURL = (id) => `${this.#ShoppingServerBaseURL}/groups/${id}`;

    // User related
    #getUsersURL = () => `${this.#ShoppingServerBaseURL}/users`;
    #getUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
    #addUserURL = () => `${this.#ShoppingServerBaseURL}/users`;
    #updateUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
    #deleteUserURL = (id) => `${this.#ShoppingServerBaseURL}/users/${id}`;
    // #searchUserURL = (userEmail) => `${this.#ShoppingServerBaseURL}/users-by-email/${userEmail}`;

    
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
        return this.#fetchAdvanced(this.#addEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(entryBO)
        }).then((responseJSON) => {
            // We always get an array of EntryBO.fromJSON, but only need one object
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(entryBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    updateEntry(entryBO) {
        return this.#fetchAdvanced(this.#updateEntryURL(entryBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(entryBO)
        }).then((responseJSON) => {
            // We always get an array of EntryBOs.fromJSON
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(entryBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    deleteEntry(entryId) {
        return this.#fetchAdvanced(this.#deleteEntryURL(entryId), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of EntryBO.fromJSON
            let responseEntryBO = EntryBO.fromJSON(responseJSON)[0];
            // console.info(entryBOs);
            return new Promise(function (resolve) {
                resolve(responseEntryBO);
            })
        })
    }

    getGroups() {
        return this.#fetchAdvanced(this.#getGroupsURL()).then((responseJSON) => {
            let groupBOs = GroupBO.fromJSON(responseJSON);
            // console.info(GroupBOs);
            return new Promise(function (resolve) {
                resolve(groupBOs);
            })
        })
    }

    getGroup(groupId) {
        return this.#fetchAdvanced(this.#getGroupURL(groupId)).then((responseJSON) => {
            // We always get an array of GroupBO.fromJSON, but only need one object
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(responseGroupBO);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    addGroup(groupBO) {
        return this.#fetchAdvanced(this.#addGroupURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)
        }).then((responseJSON) => {
            // We always get an array of GroupBO.fromJSON, but only need one object
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(groupBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    updateGroup(groupBO) {
        return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)
        }).then((responseJSON) => {
            // We always get an array of GroupBO.fromJSON
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(groupBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    deleteGroup(groupId) {
        return this.#fetchAdvanced(this.#deleteGroupURL(groupId), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of GroupBO.fromJSON
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(groupBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    getUsers() {
        return this.#fetchAdvanced(this.#getUsersURL()).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON);
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(userBOs);
            })
        })
    }

    getUser(userId) {
        return this.#fetchAdvanced(this.#getUserURL(userId)).then((responseJSON) => {
            // We always get an array of UserBOs.fromJSON, but only need one object
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            // console.info(responseUseryBO);
            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }

    addUser(userBO) {
        return this.#fetchAdvanced(this.#addUserURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            // We always get an array of UserBO.fromJSON, but only need one object
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }

    updateUser(userBO) {
        return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            // We always get an array of UserBOs.fromJSON
            let responseUseryBO = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }

    deleteUser(userId) {
        return this.#fetchAdvanced(this.#deleteUserURL(userId), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of UserBO.fromJSON
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }

}

