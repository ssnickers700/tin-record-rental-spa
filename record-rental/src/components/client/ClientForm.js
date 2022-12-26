import React from "react";
import {Link} from "react-router-dom";

class ClientForm extends React.Component{
    render() {
        return (
            <main>
                <h2>Nowy klient</h2>
                <form className="form">
                    <label htmlFor="firstName">Imię: <span className="symbol-required">*</span></label>
                    <input type="text" name="firstName" id="firstName" className="error-input" required/>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="lastName">Nazwisko: <span className="symbol-required">*</span></label>
                    <input type="text" name="lastName" id="lastName" className="error-input" required/>
                    <span id="errorLastName" className="errors-text"></span>

                    <label htmlFor="email">Email: <span className="symbol-required">*</span></label>
                    <input type="email" name="email" id="email" className="error-input" required/>
                    <span id="errorEmail" className="errors-text"></span>

                    <label>Czy wypłacalny: <span className="symbol-required">*</span></label>
                    <label htmlFor="solvencyTrue">Tak</label>
                    <input type="radio" id="solvencyTrue" name="solvency" value="true" required/>
                    <label htmlFor="solvencyFalse">Nie</label>
                    <input type="radio" id="solvencyFalse" name="solvency" value="false" required/>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input type="submit" value="Dodaj" className="form-button-submit-add"/>
                        <Link to="/clients" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        );
    }
}

export default ClientForm