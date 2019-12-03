// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNative from "react-native";

/**
 * Retrieve a local stored string value identified by a unique key. This could be set via the SetStorageItemString JavaScript action.
 * @param {string} key - This field is required.
 * @returns {string}
 */
export async function GetStorageItemString(key?: string): Promise<string> {
    // BEGIN USER CODE

    if (!key) {
        throw new TypeError("Input parameter 'Key' is required");
    }

    return getItem(key).then(result => {
        if (result === null) {
            throw new Error(`Storage item '${key}' does not exist`);
        }
        return result;
    });

    async function getItem(key: string): Promise<string | null> {
        if (navigator && navigator.product === "ReactNative") {
            const AsyncStorage: typeof ReactNative.AsyncStorage = require("@react-native-community/async-storage")
                .default;
            return AsyncStorage.getItem(key);
        }

        if (window) {
            const value = window.localStorage.getItem(key);
            return Promise.resolve(value);
        }

        throw new Error("No storage API available");
    }

    // END USER CODE
}
