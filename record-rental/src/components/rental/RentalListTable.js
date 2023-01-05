import React from "react";
import RentalListTableRow from "./RentalListTableRow";
import {useTranslation} from "react-i18next";

function RentalListTable(props) {
    const rentals = props.rentalList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t("rental.fields.client")}</th>
                <th>{t("rental.fields.client")}</th>
                <th>{t("rental.fields.startDate")}</th>
                <th>{t("rental.fields.endDate")}</th>
                <th>{t("list.actions.title")}</th>
            </tr>
            </thead>
            <tbody>
            {rentals.map(rental =>
                <RentalListTableRow
                    rentalData={rental}
                    key={rental._id}
                    toggleConfirmPopup={props.toggleConfirmPopup}
                    confirmPopup={props.confirmPopup}
                    setDeleteRentalId={props.setDeleteRentalId}
                    toggleDeletePopup={props.toggleDeletePopup}
                    setDeletePopupText={props.setDeletePopupText}
                />
            )}
            </tbody>
        </table>
    );
}

export default RentalListTable