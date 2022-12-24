import React from "react";
import {Link, useParams} from "react-router-dom";
import {getClientByIdApiCall} from "../../apiCalls/clientApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

function ClientDetails() {
    let {clientId} = useParams();
    clientId = parseInt(clientId);
    const client = getClientByIdApiCall(clientId);
    console.log(client)

    return (
        <main>
            <h2>Szczegóły klienta</h2>
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
                    <tr key={rental._id}>
                        <td>{rental.record.recordName}</td>
                        <td>{rental.record.artistName}</td>
                        <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
                        <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/clients" className="button-back">Powrót</Link>
        </main>
    );
}

export default ClientDetails