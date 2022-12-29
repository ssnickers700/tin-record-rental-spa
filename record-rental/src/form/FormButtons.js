import React from "react";
import {Link} from "react-router-dom";
import formMode from "../helpers/formHelper";

function FormButtons(props) {
    const submitButtonLabel = props.formMode === formMode.NEW ? "Dodaj" :"Edytuj";
    const submitButtonClassName = props.formMode === formMode.NEW ?
        "form-button-submit-add" : "form-button-submit-edit";

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input type="submit" value={submitButtonLabel} className={submitButtonClassName}/>
            <Link to={props.cancelPath} className="form-button-cancel">Anuluj</Link>
        </div>
    );
}

export default FormButtons