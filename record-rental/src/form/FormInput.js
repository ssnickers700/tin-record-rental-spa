import React from "react";
import {getValidationErrorKey} from "../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormInput(props) {
    const className = props.error === "" ? "" : "error-input";
    const name = props.name;
    const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);
    const error = props.error;
    const errorKey = getValidationErrorKey(error);
    const { t } = useTranslation();
    const translatedErrorKey = t(errorKey)

    return (
        <>
            <label htmlFor={props.name}>
                {props.label}
                {props.required && <span className="symbol-required">*</span>}
            </label>
            <input
                required={props.required}
                type={props.type}
                name={props.name}
                className={className}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <span id={errorSpanId} className="errors-text">{translatedErrorKey}</span>
        </>
    );
}

export default FormInput