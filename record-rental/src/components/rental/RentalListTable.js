import React from "react";
import RentalListTableRow from "./RentalListTableRow";

function RentalListTable(props) {
    const rentals = props.rentalList
    return (
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
            {rentals.map(rental =>
                <RentalListTableRow rentalData={rental} key={rental._id} />
            )}
            </tbody>
        </table>
    );
}

export default RentalListTable