import {recordDetailsList, recordList} from "./recordApiMockData";

export function getRecordsApiCall() {
    return recordList;
}

export function getRecordByIdApiCall(recordId) {
    const record = recordDetailsList.find(record => record._id === recordId)
    return record;
}