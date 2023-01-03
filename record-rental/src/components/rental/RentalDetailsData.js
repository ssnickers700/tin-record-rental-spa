import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import FormInput from "../../form/FormInput";

function RentalDetailsData(props) {
    const rental = props.rentalData;

    return (
        <>
            <form className="form">
                <label htmlFor="client">Klient: <span className="symbol-required">*</span></label>
                <select name="client" id="client" required disabled>
                    <option label={rental.client.firstName + " " + rental.client.lastName} />
                </select>
                <span id="errorClient" className="errors-text"></span>

                <label htmlFor="record">Płyta: <span className="symbol-required">*</span></label>
                <select name="record" id="record" required disabled>
                    <option label={rental.record.recordName + " - " + rental.record.artistName} />
                </select>
                <span id="errorRecord" className="errors-text"></span>

                <FormInput
                    type="date"
                    label="Data od:"
                    name="startDate"
                    value={rental.startDate ? getFormattedDate(rental.startDate) : ""}
                    disabled
                />

                <FormInput
                    type="date"
                    label="Data do:"
                    name="endDate"
                    value={rental.endDate ? getFormattedDate(rental.endDate) : ""}
                    disabled
                />

                <FormInput
                    type="number"
                    label="Cena za dzień:"
                    name="price"
                    value={rental.record.price}
                    disabled
                />

                <FormInput
                    type="email"
                    label="Email klienta:"
                    name="email"
                    value={rental.client.email}
                    disabled
                />

                <label>Czy klient wypłacalny:</label>
                <label htmlFor="solvencyTrue">Tak</label>
                <input type="radio" id="solvencyTrue" name="solvency" value="true"
                       disabled checked={rental.client.solvency === true ? "checked" : ""}/>
                <label htmlFor="solvencyFalse">Nie</label>
                <input type="radio" id="solvencyFalse" name="solvency" value="false"
                       disabled checked={rental.client.solvency === true ? "" : "checked"}/>
            </form>
            <Link to={`/rentals/edit/${rental._id}`} className="button-edit">Edytuj</Link>
        </>
    );
}

export default RentalDetailsData