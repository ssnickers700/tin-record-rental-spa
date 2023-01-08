import {clientDetailsList, clientList} from "./clientApiMockData";
import {getCurrentUser, getCurrentUserToken} from "../helpers/authHelper";
const clientsBaseUrl = "http://localhost:3000/api/clients"

export function getClientsApiCall() {
    const promise = fetch(clientsBaseUrl);
    return promise;
}

export function getClientByIdApiCall(clientId) {
    // const client = clientDetailsList.find(client => client._id === clientId)
    const promise = fetch(`${clientsBaseUrl}/${clientId}`);
    return promise;
}

export function addClientApiCall(client) {
    const clientString = JSON.stringify(client);
    const token = getCurrentUserToken();
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: clientString
    };
    const promise = fetch(clientsBaseUrl, options);
    return promise;
}

export function updateClientApiCall(clientId, client) {
    const clientString = JSON.stringify(client);
    const token = getCurrentUserToken();
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: clientString
    };
    const promise = fetch(`${clientsBaseUrl}/${clientId}`, options);
    return promise;
}

export function deleteClientApiCall(clientId) {
    const token = getCurrentUserToken();
    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    };
    const promise = fetch(`${clientsBaseUrl}/${clientId}`, options);
    return promise;
}