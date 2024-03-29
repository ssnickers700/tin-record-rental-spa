import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import formMode, {formValidationKeys, getValidationErrorKey} from "../../helpers/formHelper";
import {addClientApiCall, getClientByIdApiCall, updateClientApiCall} from "../../apiCalls/clientApiCalls";
import {
    checkEmail,
    checkRequired,
    checkTextLengthRange,
    errorRequiredText,
    getErrorLengthText
} from "../../helpers/validationCommon";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons";
import {useTranslation} from "react-i18next";

function ClientForm() {
    let {clientId} = useParams();
    clientId = parseInt(clientId);
    let currentFormMode = clientId ? formMode.EDIT : formMode.NEW;
    const [clientIdHook, setClientIdHook] = useState(clientId);
    const [client, setClient] = useState({firstName: "", lastName: "", email: "", password: "", solvency: ""});
    const [errors, setErrors] = useState({firstName: "", lastName: "", email: "", password: "", solvency: ""});
    const [formModeHook, setFormModeHook] = useState(currentFormMode);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();

    const fetchClientDetails = () => {
        getClientByIdApiCall(clientIdHook)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setClient(null);
                        setMessage(data.message);
                    } else {
                        setClient(data);
                        setMessage(null);
                    }
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        if (formModeHook === formMode.EDIT) {
            fetchClientDetails();
        }
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        const clientChange = {...client};
        clientChange[name] = value;

        const errorMessage = validateField(name, value);
        const errorsChange = {...errors};
        errorsChange[name] = errorMessage;

        setClient(clientChange);
        setErrors(errorsChange);
        setError(null);
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "firstName") {
            if (!checkRequired(fieldValue)) {
               errorMessage = errorRequiredText;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            }
        }
        if (fieldName === "lastName") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            }
        }
        if (fieldName === "email") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = formValidationKeys.len_5_60;
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.notEmail;
            }
        }
        if (fieldName === "solvency") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            }
        }
        if (fieldName === "password") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            }
        }
        return errorMessage;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            const
                clientSubmit = client,
                currentFormMode = formModeHook
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addClientApiCall(clientSubmit)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(clientSubmit)
                promise = updateClientApiCall(clientIdHook, clientSubmit)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                const errorsResponse = {firstName: "", lastName: "", email: "", password: "", solvency: ""}
                                for (let i = data.error.errors.length - 1; i >=0; i--) {
                                    const errorItem = data.error.errors[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    errorsResponse[fieldName] = errorMessage
                                    setError(null);
                                }
                                setErrors(errorsResponse);
                            } else {
                                setRedirect(true);
                            }
                        },
                        (error) => {
                            setError(error);
                            console.log(JSON.stringify(error))
                        }
                    )
            }
        }
    }

    const validateForm = () => {
        const formClient = client;
        const formErrors = errors;
        for (const fieldName in formClient) {
            const fieldValue = formClient[fieldName];
            const errorMessage = validateField(fieldName, fieldValue);
            formErrors[fieldName] = errorMessage;
        }
        const formErrors2 = {...formErrors}
        setErrors(formErrors2);
        return !hasErrors();
    }

    const hasErrors = () => {
        for (const fieldName in errors) {
            if (errors[fieldName].length > 0) {
                return true;
            }
        }
        return false;
    }

    const navigate = useNavigate();
    if (redirect) {
        const currentFormMode = formModeHook;
        const notice = currentFormMode === formMode.NEW ?
            t("client.form.add.confirm.text") : t("client.form.edit.confirm.text")
        return (
            navigate("/clients", {
                state: notice,
            })
        )
    }

    const errorsSummary = hasErrors() ? t(getValidationErrorKey("formErrors")) : "";
    const fetchError = error ? `${t("render.error")} ${message}` : "";
    const pageTitle = formModeHook === formMode.NEW ?
        t("client.form.add.pageTitle") : t("client.form.edit.pageTitle");
    const globalErrorMessage = errorsSummary || fetchError || message

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <FormInput
                    type="text"
                    label={t("client.fields.firstName")}
                    required
                    error={errors.firstName}
                    name="firstName"
                    onChange={handleChange}
                    value={client.firstName}
                />

                <FormInput
                    type="text"
                    label={t("client.fields.lastName")}
                    required
                    error={errors.lastName}
                    name="lastName"
                    onChange={handleChange}
                    value={client.lastName}
                />

                <FormInput
                    type="email"
                    label={t("client.fields.email")}
                    required
                    error={errors.email}
                    name="email"
                    onChange={handleChange}
                    value={client.email}
                />

                <FormInput
                    type="password"
                    label={t("client.fields.password")}
                    required
                    error={errors.password}
                    name="password"
                    onChange={handleChange}
                    value={client.password}
                />

                <label>{t("client.fields.solvency")}<span className="symbol-required">*</span></label>
                <label htmlFor="solvencyTrue">{t("yes")}</label>
                <input type="radio" id="solvencyTrue" name="solvency" value="true"
                       checked={client.solvency === "true" || client.solvency === true}
                       onChange={handleChange} required/>
                <label htmlFor="solvencyFalse">{t("no")}</label>
                <input type="radio" id="solvencyFalse" name="solvency" value="false"
                       checked={client.solvency === "false" || client.solvency === false}
                       onChange={handleChange} required/>
                <span id="errorSolvency" className="errors-text">{t(getValidationErrorKey(errors.solvency))}</span>

                <FormButtons
                    formMode={formModeHook}
                    error={globalErrorMessage}
                    cancelPath="/clients"
                />
            </form>
        </main>
    );
}

export default ClientForm