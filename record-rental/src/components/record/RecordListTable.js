import React from "react";
import RecordListTableRow from "./RecordListTableRow";
import {useTranslation} from "react-i18next";

function RecordListTable(props) {
    const records = props.recordList;
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t("record.fields.recordName")}</th>
                <th>{t("record.fields.artistName")}</th>
                <th>{t("record.fields.price")}</th>
                <th>{t("record.fields.unit")}</th>
                <th>{t("list.actions.title")}</th>
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
                    toggleDeletePopup={props.toggleDeletePopup}
                    setDeletePopupText={props.setDeletePopupText}
                />
            )}
            </tbody>
        </table>
    );
}

export default RecordListTable