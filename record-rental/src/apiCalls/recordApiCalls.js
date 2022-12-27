import {recordDetailsList, recordList} from "./recordApiMockData";
const recordsBaseUrl = "http://localhost:3000/api/records"


export function getRecordsApiCall() {
    const promise = fetch(recordsBaseUrl);
    return promise;
}

export function getRecordByIdApiCall(recordId) {
    // const record = recordDetailsList.find(record => record._id === recordId)
    const promise = fetch(`${recordsBaseUrl}/${recordId}`);
    return promise;}