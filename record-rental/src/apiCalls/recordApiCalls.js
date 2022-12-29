import {recordDetailsList, recordList} from "./recordApiMockData";
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
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: recordString
    };
    const promise = fetch(recordsBaseUrl, options);
    return promise;
}

export function updateRecordApiCall(recordId, record) {
    const recordString = JSON.stringify(record);
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: recordString
    };
    const promise = fetch(`${recordsBaseUrl}/${recordId}`, options);
    return promise;
}