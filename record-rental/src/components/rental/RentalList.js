import React from "react";
import {Link} from "react-router-dom";
import {getRentalsApiCall} from "../../apiCalls/rentalApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

function RentalList() {
    const rentalList = getRentalsApiCall();
    return (
        <main>
            <h2>Lista wynajmów</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Klient</th>
                    <th>Płyta</th>
                    <th>Data od</th>
                    <th>Data do</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {rentalList.map(rental => (
                    <tr key={rental._id}>
                        <td>{rental.client.firstName + " " + rental.client.lastName}</td>
                        <td>{rental.record.recordName + " - " + rental.record.artistName}</td>
                        <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
                        <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/rentals/details/${rental._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`/rentals/edit/${rental._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`/rentals/delete/${rental._id}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/rentals/add" className="button-add">Dodaj nowy wynajem</Link>
        </main>
    )
}

export default RentalList