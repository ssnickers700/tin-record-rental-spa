import React from "react";
import {Link} from "react-router-dom";
import formMode from "../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormButtons(props) {
    const { t } = useTranslation();
    const submitButtonLabel = props.formMode === formMode.NEW ?
        t("form.actions.add") : props.formMode === formMode.LOGIN ?
            t("form.actions.login") : t("form.actions.edit");
    const submitButtonClassName = props.formMode === formMode.EDIT ?
        "form-button-submit-edit" : "form-button-submit-add";

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input type="submit" value={submitButtonLabel} className={submitButtonClassName}/>
            <Link to={props.cancelPath} onClick={props.cancelAction} className="form-button-cancel">{t("form.actions.cancel")}</Link>
        </div>
    );
}

export default FormButtons