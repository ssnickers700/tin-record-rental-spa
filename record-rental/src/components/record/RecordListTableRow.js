import React from "react";
import {Link} from "react-router-dom";

function RecordListTableRow(props) {
    const record = props.recordData
    return (
        <tr>
            <td>{record.recordName}</td>
            <td>{record.artistName}</td>
            <td>{record.price}</td>
            <td>{record.unit}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/records/details/${record._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/records/edit/${record._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/records/delete/${record._id}`} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}

export default RecordListTableRow