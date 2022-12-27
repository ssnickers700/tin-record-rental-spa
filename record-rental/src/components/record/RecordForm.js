import React from "react";
import {Link} from "react-router-dom";

function RecordForm() {
    return (
        <main>
            <h2>Nowa płyta</h2>
            <form className="form">
                <label htmlFor="recordName">Tytuł: <span className="symbol-required">*</span></label>
                <input type="text" name="recordName" id="recordName" className="error-input" required/>
                <span id="errorRecordName" className="errors-text"></span>

                <label htmlFor="artistName">Artysta: <span className="symbol-required">*</span></label>
                <input type="text" name="artistName" id="artistName" className="error-input" required/>
                <span id="errorArtistName" className="errors-text"></span>

                <label htmlFor="price">Cena za dzień: <span className="symbol-required">*</span></label>
                <input type="number" min="0.00" name="price" id="price" className="error-input" required/>
                <span id="errorPrice" className="errors-text"></span>

                <label htmlFor="unit">Ilość dostępnych: <span className="symbol-required">*</span></label>
                <input type="number" name="unit" id="unit" className="error-input" required/>
                <span id="errorUnit" className="errors-text"></span>

                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text"></p>
                    <input type="submit" value="Dodaj" className="form-button-submit-add"/>
                    <Link to="/records" className="form-button-cancel">Anuluj</Link>
                </div>
            </form>
        </main>
    );
}


export default RecordForm