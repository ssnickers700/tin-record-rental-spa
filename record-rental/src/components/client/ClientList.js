import React from "react";
import {Link} from "react-router-dom";
import {getClientsApiCall} from "../../apiCalls/clientApiCalls";

function ClientList() {
    const clientList = getClientsApiCall();
    return (
        <main>
            <h2>Lista klientów</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>E-mail</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {clientList.map(client => (
                    <tr key={client._id}>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.email}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/clients/details/${client._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`/clients/edit/${client._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`/clients/delete/${client._id}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/clients/add" className="button-add">Dodaj nowego klienta</Link>
        </main>
    )
}

export default ClientList