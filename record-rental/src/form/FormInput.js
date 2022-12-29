import React from "react";

function FormInput(props) {
    const className = props.error === "" ? "" : "error-input";
    const name = props.name;
    const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);

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
                defaultValue={props.value}
                onChange={props.onChange}
            />
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    );
}

export default FormInput