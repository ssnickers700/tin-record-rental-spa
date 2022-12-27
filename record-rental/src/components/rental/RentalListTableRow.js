import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";

function RentalListTableRow(props) {
    const rental = props.rentalData
    return (
        <tr>
            <td>{rental.client.firstName + " " + rental.client.lastName}</td>
            <td>{rental.record.recordName + " - " + rental.record.artistName}</td>
            <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
            <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/rentals/details/${rental._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/rentals/edit/${rental._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/rentals/delete/${rental._id}`} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}

export default RentalListTableRow