import React from "react";
import {Link} from "react-router-dom";

function ClientListTableRow(props) {
    const client = props.clientData
    return (
        <tr>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/clients/details/${client._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/clients/edit/${client._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link onClick={() => {
                        props.toggleConfirmPopup(!props.confirmPopup)
                        props.setDeleteClientId(client._id);
                    }} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}

export default ClientListTableRow