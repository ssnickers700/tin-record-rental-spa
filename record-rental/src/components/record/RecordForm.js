import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addRecordApiCall, getRecordByIdApiCall, updateRecordApiCall} from "../../apiCalls/recordApiCalls";
import {
    checkInteger,
    checkNumber,
    checkNumberRange,
    checkRequired,
    checkTextLengthRange,
    errorRequiredText,
    getErrorLengthText
} from "../../helpers/validationCommon";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons";
import {useTranslation} from "react-i18next";

function RecordForm() {
    let {recordId} = useParams();
    recordId = parseInt(recordId);
    let currentFormMode = recordId ? formMode.EDIT : formMode.NEW;
    const [recordIdHook, setRecordIdHook] = useState(recordId);
    const [record, setRecord] = useState({recordName: "", artistName: "", price: "", unit: ""});
    const [errors, setErrors] = useState({recordName: "", artistName: "", price: "", unit: ""});
    const [formModeHook, setFormModeHook] = useState(currentFormMode);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();

    const fetchRecordDetails = () => {
        getRecordByIdApiCall(recordIdHook)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setRecord(null);
                        setMessage(data.message);
                    } else {
                        setRecord(data);
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
            fetchRecordDetails();
        }
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        const recordChange = {...record};
        recordChange[name] = value;

        const errorMessage = validateField(name, value);
        const errorsChange = {...errors};
        errorsChange[name] = errorMessage;

        setRecord(recordChange);
        setErrors(errorsChange);
        setError(null);
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "recordName") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkTextLengthRange(fieldValue, 1, 60)) {
                errorMessage = getErrorLengthText(1, 60);
            }
        }
        if (fieldName === "artistName") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkTextLengthRange(fieldValue, 1, 60)) {
                errorMessage = getErrorLengthText(1, 60);
            }
        }
        if (fieldName === "price") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Wartość powinna być liczbą";
            } else if (!checkNumberRange(fieldValue, 0, 1_000_000)) {
                errorMessage = "Podaj wartość od 0 do 1,000,000";
            }
        }
        if (fieldName === "unit") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Wartość powinna być liczbą";
            } else if (!checkNumberRange(fieldValue, 0, 1_000_000)) {
                errorMessage = "Podaj wartość od 0 do 1,000,000";
            } else if (!checkInteger(fieldValue)) {
                errorMessage = "Wartość powinna być liczbą całkowitą";
            }
        }
        return errorMessage;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            const
                recordSubmit = record,
                currentFormMode = formModeHook
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addRecordApiCall(recordSubmit)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(recordSubmit)
                promise = updateRecordApiCall(recordIdHook, recordSubmit)
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
                                const errorsResponse = {recordName: "", artistName: "", price: "", unit: ""}
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
        const formRecord = record;
        const formErrors = errors;
        for (const fieldName in formRecord) {
            const fieldValue = formRecord[fieldName];
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
            t("record.form.add.confirm.text") : t("record.form.edit.confirm.text")
        return (
            navigate("/records", {
                state: notice,
            })
        )
    }

    const errorsSummary = hasErrors() ? "Formularz zawiera błędy" : "";
    const fetchError = error ? `${t("render.error")} ${message}` : "";
    const pageTitle = formModeHook === formMode.NEW ?
        t("record.form.add.pageTitle") : t("record.form.edit.pageTitle");
    const globalErrorMessage = errorsSummary || fetchError || message

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <FormInput
                    type="text"
                    label={t("record.fields.recordName")}
                    required
                    error={errors.recordName}
                    name="recordName"
                    onChange={handleChange}
                    value={record.recordName}
                />

                <FormInput
                    type="text"
                    label={t("record.fields.artistName")}
                    required
                    error={errors.artistName}
                    name="artistName"
                    onChange={handleChange}
                    value={record.artistName}
                />

                <FormInput
                    type="text"
                    label={t("record.fields.price")}
                    required
                    error={errors.price}
                    name="price"
                    onChange={handleChange}
                    value={record.price}
                />

                <FormInput
                    type="text"
                    label={t("record.fields.unit")}
                    required
                    error={errors.unit}
                    name="unit"
                    onChange={handleChange}
                    value={record.unit}
                />

                <FormButtons
                    formMode={formModeHook}
                    error={globalErrorMessage}
                    cancelPath="/records"
                />
            </form>
        </main>
    );
}


export default RecordForm