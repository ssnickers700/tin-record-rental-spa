import {clientDetailsList, clientList} from "./clientApiMockData";

export function getClientsApiCall() {
    return clientList;
}

export function getClientByIdApiCall(clientId) {
    const client = clientDetailsList.find(client => client._id === clientId)
    return client;
}