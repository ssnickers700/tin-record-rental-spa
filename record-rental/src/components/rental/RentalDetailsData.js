import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import FormInput from "../../form/FormInput";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function RentalDetailsData(props) {
    const rental = props.rentalData;
    const { t } = useTranslation();

    return (
        <>
            <form className="form">
                <label htmlFor="client">{t("rental.fields.client")}</label>
                <select name="client" id="client" required disabled>
                    <option label={rental.client.firstName + " " + rental.client.lastName} />
                </select>
                <span id="errorClient" className="errors-text"></span>

                <label htmlFor="record">{t("rental.fields.record")}</label>
                <select name="record" id="record" required disabled>
                    <option label={rental.record.recordName + " - " + rental.record.artistName} />
                </select>
                <span id="errorRecord" className="errors-text"></span>

                <FormInput
                    type="date"
                    label={t("rental.fields.startDate")}
                    name="startDate"
                    value={rental.startDate ? getFormattedDate(rental.startDate) : ""}
                    disabled
                />

                <FormInput
                    type="date"
                    label={t("rental.fields.endDate")}
                    name="endDate"
                    value={rental.endDate ? getFormattedDate(rental.endDate) : ""}
                    disabled
                />

                <FormInput
                    type="number"
                    label={t("rental.form.details.price")}
                    name="price"
                    value={rental.record.price}
                    disabled
                />

                <FormInput
                    type="email"
                    label={t("rental.form.details.email")}
                    name="email"
                    value={rental.client.email}
                    disabled
                />

                <label>{t("rental.form.details.solvency")}</label>
                <label htmlFor="solvencyTrue">{t("yes")}</label>
                <input type="radio" id="solvencyTrue" name="solvency" value="true"
                       disabled checked={rental.client.solvency === true ? "checked" : ""}/>
                <label htmlFor="solvencyFalse">{t("no")}</label>
                <input type="radio" id="solvencyFalse" name="solvency" value="false"
                       disabled checked={rental.client.solvency === true ? "" : "checked"}/>
            </form>
            {isAuthenticated() && <Link to={`/rentals/edit/${rental._id}`} className="button-edit">{t("form.actions.edit")}</Link>}
        </>
    );
}

export default RentalDetailsData