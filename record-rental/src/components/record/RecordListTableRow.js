import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function RecordListTableRow(props) {
    const record = props.recordData;
    const { t } = useTranslation();
    return (
        <tr>
            <td>{record.recordName}</td>
            <td>{record.artistName}</td>
            <td>{record.price}</td>
            <td>{record.unit}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/records/details/${record._id}`}
                              className="list-actions-button-details">{t("list.actions.details")}</Link></li>
                    {isAuthenticated() &&
                        <>
                            <li><Link to={`/records/edit/${record._id}`}
                                      className="list-actions-button-edit">{t("list.actions.edit")}</Link></li>
                            <li><Link onClick={() => {
                                props.toggleConfirmPopup(!props.confirmPopup)
                                props.setDeleteRecordId(record._id);
                                props.toggleDeletePopup(false);
                                props.setDeletePopupText(null);
                            }} className="list-actions-button-delete">{t("list.actions.delete")}</Link>
                            </li>
                        </>
                    }
                </ul>
            </td>
        </tr>
    );
}

export default RecordListTableRow