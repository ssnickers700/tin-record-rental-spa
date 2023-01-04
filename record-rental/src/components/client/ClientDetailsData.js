import React from "react";
import {Link} from "react-router-dom";
import ClientDetailsDataTableRow from "./ClientDetailsDataTableRow";
import FormInput from "../../form/FormInput";
import {useTranslation} from "react-i18next";

function ClientDetailsData(props) {
    const client = props.clientData
    const { t } = useTranslation();

    return (
        <>
            <form className="form">
                <FormInput
                    type="text"
                    label={t("client.fields.firstName")}
                    name="firstName"
                    value={client.firstName}
                    disabled
                />

                <FormInput
                    type="text"
                    label={t("client.fields.lastName")}
                    name="lastName"
                    value={client.lastName}
                    disabled
                />

                <FormInput
                    type="email"
                    label={t("client.fields.email")}
                    name="email"
                    value={client.email}
                    disabled
                />

                <label>{t("client.fields.solvency")}</label>
                <label htmlFor="solvencyTrue">{t("yes")}</label>
                <input type="radio" id="solvencyTrue" name="solvency" value="true"
                       disabled checked={client.solvency === true ? "checked" : ""}/>
                <label htmlFor="solvencyFalse">{t("no")}</label>
                <input type="radio" id="solvencyFalse" name="solvency" value="false"
                       disabled checked={client.solvency === true ? "" : "checked"}/>
            </form>
            <Link to={`/clients/edit/${client._id}`} className="button-edit">{t("form.actions.edit")}</Link>
            <h2>{t("client.form.details.employment")}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t("record.fields.recordName")}</th>
                    <th>{t("record.fields.artistName")}</th>
                    <th>{t("rental.fields.startDate")}</th>
                    <th>{t("rental.fields.endDate")}</th>
                </tr>
                </thead>
                <tbody>
                {client.rentals.map(rental => (
                    <ClientDetailsDataTableRow rentalData={rental} key={rental._id} />
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ClientDetailsData