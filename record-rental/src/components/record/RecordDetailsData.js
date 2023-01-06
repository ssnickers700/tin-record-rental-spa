import React from "react";
import {Link} from "react-router-dom";
import RecordDetailsDataTableRow from "./RecordDetailsDataTableRow";
import FormInput from "../../form/FormInput";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function RecordDetailsData(props) {
    const record = props.recordData
    const { t } = useTranslation();

    return (
        <>
            <form className="form">
                <FormInput
                    type="text"
                    label={t("record.fields.recordName")}
                    name="recordName"
                    value={record.recordName}
                    disabled
                />

                <FormInput
                    type="text"
                    label={t("record.fields.artistName")}
                    name="artistName"
                    value={record.artistName}
                    disabled
                />

                <FormInput
                    type="text"
                    label={t("record.fields.price")}
                    name="price"
                    value={record.price}
                    disabled
                />

                <FormInput
                    type="text"
                    label={t("record.fields.unit")}
                    name="unit"
                    value={record.unit}
                    disabled
                />
            </form>
            {isAuthenticated() && <Link to={`/records/edit/${record._id}`} className="button-edit">{t("form.actions.edit")}</Link>}
            <h2>{t("record.form.details.employment")}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t("client.fields.firstName")}</th>
                    <th>{t("client.fields.lastName")}</th>
                    <th>{t("rental.fields.startDate")}</th>
                    <th>{t("rental.fields.endDate")}</th>
                </tr>
                </thead>
                <tbody>
                {record.rentals.map(rental =>
                    <RecordDetailsDataTableRow rentalData={rental} key={rental._id} />
                )}
                </tbody>
            </table>
        </>
    );
}

export default RecordDetailsData