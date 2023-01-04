import React from "react";
import {Link} from "react-router-dom";
import formMode from "../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormButtons(props) {
    const { t } = useTranslation();
    const submitButtonLabel = props.formMode === formMode.NEW ? t("form.actions.add") : t("form.actions.edit");
    const submitButtonClassName = props.formMode === formMode.NEW ?
        "form-button-submit-add" : "form-button-submit-edit";

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input type="submit" value={submitButtonLabel} className={submitButtonClassName}/>
            <Link to={props.cancelPath} className="form-button-cancel">{t("form.actions.cancel")}</Link>
        </div>
    );
}

export default FormButtons