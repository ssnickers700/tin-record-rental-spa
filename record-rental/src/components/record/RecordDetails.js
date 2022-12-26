import React from "react";
import {Link, useParams} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import {getRecordByIdApiCall} from "../../apiCalls/recordApiCalls";

function RecordDetails() {
    let {recordId} = useParams();
    recordId = parseInt(recordId);
    const record = getRecordByIdApiCall(recordId);

    return (
        <main>
            <h2>Szczegóły płyty</h2>
            <form className="form">
                <label htmlFor="recordName">Tytuł:</label>
                <input type="text" name="recordName" id="recordName" value={record.recordName} className="error-input" disabled
                       required/>

                <label htmlFor="artistName">Artysta:</label>
                <input type="text" name="artistName" id="artistName" value={record.artistName} className="error-input" disabled
                       required/>

                <label htmlFor="price">Cena za dzień:</label>
                <input type="number" name="price" min="0.00" id="price" value={record.price} className="error-input" disabled
                       required/>

                <label htmlFor="unit">Ilość dostępnych:</label>
                <input type="number" name="unit" id="unit" value={record.unit} className="error-input" disabled required/>
            </form>
            <Link to={`/records/edit/${record._id}`} className="button-edit">Edytuj</Link>
            <h2>Szczegóły wypożyczeń płyty</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Data od</th>
                    <th>Data do</th>
                </tr>
                </thead>
                <tbody>
                {record.rentals.map(rental => (
                    <tr key={rental._id}>
                        <td>{rental.client.firstName}</td>
                        <td>{rental.client.lastName}</td>
                        <td>{rental.startDate ? getFormattedDate(rental.startDate) : ""}</td>
                        <td>{rental.endDate ? getFormattedDate(rental.endDate) : ""}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/records" className="button-back">Powrót</Link>
        </main>
    );
}

export default RecordDetails