import {recordDetailsList, recordList} from "./recordApiMockData";
import {getCurrentUser, getCurrentUserToken} from "../helpers/authHelper";
const recordsBaseUrl = "http://localhost:3000/api/records"


export function getRecordsApiCall() {
    const promise = fetch(recordsBaseUrl);
    return promise;
}

export function getRecordByIdApiCall(recordId) {
    // const record = recordDetailsList.find(record => record._id === recordId)
    const promise = fetch(`${recordsBaseUrl}/${recordId}`);
    return promise;
}

export function addRecordApiCall(record) {
    const recordString = JSON.stringify(record);
    const token = getCurrentUserToken();
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: recordString
    };
    const promise = fetch(recordsBaseUrl, options);
    return promise;
}

export function updateRecordApiCall(recordId, record) {
    const recordString = JSON.stringify(record);
    const token = getCurrentUserToken();
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: recordString
    };
    const promise = fetch(`${recordsBaseUrl}/${recordId}`, options);
    return promise;
}

export function deleteRecordApiCall(recordId) {
    const token = getCurrentUserToken();
    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    };
    const promise = fetch(`${recordsBaseUrl}/${recordId}`, options);
    return promise;
}