import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";

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

                <label htmlFor="startDate">Data od:</label>
                <input type="date" name="startDate" id="startDate"
                       value={rental.startDate ? getFormattedDate(rental.startDate) : ""}
                       required disabled/>

                <label htmlFor="endDate">Data do:</label>
                <input type="date" name="endDate" id="endDate"
                       value={rental.endDate ? getFormattedDate(rental.endDate) : ""}
                       disabled/>

                <label htmlFor="price">Cena za dzień:</label>
                <input type="number" name="price" min="0.00" id="price" value={rental.record.price} disabled
                       required/>

                <label htmlFor="email">Email klienta:</label>
                <input type="email" name="email" id="email" value={rental.client.email} disabled required/>

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