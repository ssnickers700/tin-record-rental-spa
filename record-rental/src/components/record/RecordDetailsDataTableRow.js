import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";

function RecordDetailsDataTableRow(props) {
    const rental = props.rentalData
    return (
        <tr>
            <td>{rental.client.firstName}</td>
            <td>{rental.client.lastName}</td>
            <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
            <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
        </tr>
    );
}

export default RecordDetailsDataTableRow