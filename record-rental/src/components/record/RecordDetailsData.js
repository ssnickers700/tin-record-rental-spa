import React from "react";
import {Link} from "react-router-dom";
import RecordDetailsDataTableRow from "./RecordDetailsDataTableRow";
import FormInput from "../../form/FormInput";

function RecordDetailsData(props) {
    const record = props.recordData

    return (
        <>
            <form className="form">
                <FormInput
                    type="text"
                    label="Tytuł:"
                    name="recordName"
                    value={record.recordName}
                    disabled
                />

                <FormInput
                    type="text"
                    label="Artysta:"
                    name="artistName"
                    value={record.artistName}
                    disabled
                />

                <FormInput
                    type="text"
                    label="Cena za dzień:"
                    name="price"
                    value={record.price}
                    disabled
                />

                <FormInput
                    type="text"
                    label="Ilość dostępnych:"
                    name="unit"
                    value={record.unit}
                    disabled
                />
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
                {record.rentals.map(rental =>
                    <RecordDetailsDataTableRow rentalData={rental} key={rental._id} />
                )}
                </tbody>
            </table>
        </>
    );
}

export default RecordDetailsData