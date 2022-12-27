import {clientDetailsList, clientList} from "./clientApiMockData";
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