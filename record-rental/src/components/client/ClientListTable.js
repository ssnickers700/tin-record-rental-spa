import React from "react";
import ClientListTableRow from "./ClientListTableRow";

function ClientListTable(props) {
    const clients = props.clientList
    return (
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
            {clients.map(client =>
                <ClientListTableRow clientData={client} key={client._id} />
            )}
            </tbody>
        </table>
    );
}

export default ClientListTable