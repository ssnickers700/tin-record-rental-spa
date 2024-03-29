import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";

function ClientDetailsDataTableRow(props) {
    const rental = props.rentalData
    return (
        <tr>
            <td>{rental.record.recordName}</td>
            <td>{rental.record.artistName}</td>
            <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
            <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
        </tr>
    );
}

export default ClientDetailsDataTableRow