import React from "react";
import {Link} from "react-router-dom";
import {getRecordsApiCall} from "../../apiCalls/recordApiCalls";

function RecordList() {
    const recordList = getRecordsApiCall();
    return (
        <main>
            <h2>Lista płyt</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Artysta</th>
                    <th>Cena za dzień</th>
                    <th>Ilość dostępnych</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {recordList.map(record => (
                    <tr key={record._id}>
                        <td>{record.recordName}</td>
                        <td>{record.artistName}</td>
                        <td>{record.price}</td>
                        <td>{record.unit}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/records/details/${record._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`/records/edit/${record._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`/records/delete/${record._id}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/records/add" className="button-add">Dodaj nową płytę</Link>
        </main>
    )
}

export default RecordList