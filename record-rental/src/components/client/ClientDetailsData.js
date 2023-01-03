import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import ClientListTableRow from "./ClientListTableRow";
import ClientDetailsDataTableRow from "./ClientDetailsDataTableRow";
import FormInput from "../../form/FormInput";

function ClientDetailsData(props) {
    const client = props.clientData

    return (
        <>
            <form className="form">
                <FormInput
                    type="text"
                    label="Imię:"
                    name="firstName"
                    value={client.firstName}
                    disabled
                />

                <FormInput
                    type="text"
                    label="Nazwisko:"
                    name="lastName"
                    value={client.lastName}
                    disabled
                />

                <FormInput
                    type="email"
                    label="Email:"
                    name="email"
                    value={client.email}
                    disabled
                />

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