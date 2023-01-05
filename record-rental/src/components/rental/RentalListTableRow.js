import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";

function RentalListTableRow(props) {
    const rental = props.rentalData;
    const { t } = useTranslation();
    return (
        <tr>
            <td>{rental.client.firstName + " " + rental.client.lastName}</td>
            <td>{rental.record.recordName + " - " + rental.record.artistName}</td>
            <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
            <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/rentals/details/${rental._id}`} className="list-actions-button-details">{t("list.actions.details")}</Link></li>
                    <li><Link to={`/rentals/edit/${rental._id}`} className="list-actions-button-edit">{t("list.actions.edit")}</Link></li>
                    <li><Link onClick={() => {
                        props.toggleConfirmPopup(!props.confirmPopup)
                        props.setDeleteRentalId(rental._id);
                        props.toggleDeletePopup(false);
                        props.setDeletePopupText(null);
                    }} className="list-actions-button-delete">{t("list.actions.delete")}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}

export default RentalListTableRow