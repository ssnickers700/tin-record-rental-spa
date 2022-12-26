import React from "react";
import {Link} from "react-router-dom";
import {getClientsApiCall} from "../../apiCalls/clientApiCalls";
import {getRecordsApiCall} from "../../apiCalls/recordApiCalls";

class RentalForm extends React.Component{
    render() {
        const allClients = getClientsApiCall();
        const allRecords = getRecordsApiCall();

        return (
            <main>
                <h2>Nowy wynajem</h2>
                <form className="form">
                    <label htmlFor="client">Klient: <span className="symbol-required">*</span></label>
                    <select name="client" id="client" required>
                        <option value>Wybierz klienta</option>
                        {allClients.map(client =>
                            (<option key={client._id} value={client._id}
                                     label={client.firstName + " " + client.lastName}>
                            </option>)
                        )}
                    </select>
                    <span id="errorClient" className="errors-text"></span>

                    <label htmlFor="record">Płyta: <span className="symbol-required">*</span></label>
                    <select name="record" id="record" required>
                        <option value>Wybierz płytę</option>
                        {allRecords.map(record =>
                            (<option key={record._id} value={record._id}
                                     label={record.recordName + " - " + record.artistName}>
                            </option>)
                        )}
                    </select>
                    <span id="errorRecord" className="errors-text"></span>

                    <label htmlFor="startDate">Data od:</label>
                    <input type="date" name="startDate" id="startDate" required />

                    <label htmlFor="endDate">Data do:</label>
                    <input type="date" name="endDate" id="endDate" />

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input type="submit" value="Dodaj" className="form-button-submit-add"/>
                        <Link to="/rentals" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        );
    }
}

export default RentalForm