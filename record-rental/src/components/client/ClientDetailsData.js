import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import ClientListTableRow from "./ClientListTableRow";
import ClientDetailsDataTableRow from "./ClientDetailsDataTableRow";

function ClientDetailsData(props) {
    const client = props.clientData

    return (
        <>
            <form className="form">
                <label htmlFor="firstName">Imię:</label>
                <input type="text" name="firstName" id="firstName" value={client.firstName} disabled required/>

                <label htmlFor="lastName">Nazwisko:</label>
                <input type="text" name="lastName" id="lastName" value={client.lastName} disabled required/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={client.email} disabled required/>

                <label>Czy wypłacalny:</label>
                <label htmlFor="solvencyTrue">Tak</label>
                <input type="radio" id="solvencyTrue" name="solvency" value="true"
                       disabled checked={client.solvency === true ? "checked" : ""}/>
                <label htmlFor="solvencyFalse">Nie</label>
                <input type="radio" id="solvencyFalse" name="solvency" value="false"
                       disabled checked={client.solvency === true ? "" : "checked"}/>
            </form>
            <Link to={`/clients/edit/${client._id}`} className="button-edit">Edytuj</Link>
            <h2>Szczegóły wypożyczeń klienta</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytul</th>
                    <th>Artysta</th>
                    <th>Data od</th>
                    <th>Data do</th>
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