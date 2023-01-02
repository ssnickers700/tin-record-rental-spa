import React from "react";
import RecordListTableRow from "./RecordListTableRow";

function RecordListTable(props) {
    const records = props.recordList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Tytuł</th>
                <th>Artysta</th>
                <th>Cena za dzień</th>
                <th>Ilość dostępnych</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {records.map(record =>
                <RecordListTableRow
                    recordData={record}
                    key={record._id}
                    toggleConfirmPopup={props.toggleConfirmPopup}
                    confirmPopup={props.confirmPopup}
                    setDeleteRecordId={props.setDeleteRecordId}
                />
            )}
            </tbody>
        </table>
    );
}

export default RecordListTable