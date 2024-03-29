import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    addClientApiCall,
    getClientByIdApiCall,
    getClientsApiCall,
    updateClientApiCall
} from "../../apiCalls/clientApiCalls";
import {getRecordsApiCall} from "../../apiCalls/recordApiCalls";
import formMode, {formValidationKeys, getValidationErrorKey} from "../../helpers/formHelper";
import {useState, useEffect} from "react";
import {addRentalApiCall, getRentalByIdApiCall, updateRentalApiCall} from "../../apiCalls/rentalApiCalls";
import {
    checkDate, checkDateIfAfter,
    checkEmail,
    checkRequired,
    checkTextLengthRange, errorDateFormat,
    errorRequiredText,
    getErrorLengthText, getNowDate
} from "../../helpers/validationCommon";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";

function RentalForm() {
    let {rentalId} = useParams();
    rentalId = parseInt(rentalId);
    let currentFormMode = rentalId ? formMode.EDIT : formMode.NEW;
    const [rentalIdHook, setRentalIdHook] = useState(rentalId);
    const [rental, setRental] = useState({client_id: "", record_id: "", startDate: "", endDate: ""});
    const [errors, setErrors] = useState({client_id: "", record_id: "", startDate: "", endDate: ""});
    const [formModeHook, setFormModeHook] = useState(currentFormMode);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const [allClients, setAllClients] = useState([{_id: "", firstName: "", lastName: "", email: "", solvency: ""}]);
    const [allRecords, setAllRecords] = useState([{_id: "", recordName: "", artistName: "", price: "", unit: ""}]);
    const { t } = useTranslation();

    const fetchRentalDetails = () => {
        getRentalByIdApiCall(rentalIdHook)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setRental(null);
                        setMessage(data.message);
                    } else {
                        setRental(data);
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

    const fetchClientList = () => {
        getClientsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setAllClients(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    const fetchRecordList = () => {
        getRecordsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setAllRecords(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetchClientList();
        fetchRecordList();
        if (formModeHook === formMode.EDIT) {
            fetchRentalDetails();
        }
    }, []);

    const formatFieldName = (name) => {
        return name === "client" || name === "record" ? name + "_id" : name;
    }

    const handleChange = (event) => {
        let {name, value} = event.target;
        const rentalChange = {...rental};
        name = formatFieldName(name);
        rentalChange[name] = value;

        const errorMessage = validateField(name, value);
        const errorsChange = {...errors};
        errorsChange[name] = errorMessage;

        setRental(rentalChange);
        setErrors(errorsChange);
        setError(null);
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "client_id") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            }
        }
        if (fieldName === "record_id") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            }
        }
        if (fieldName === "startDate") {
            if (!checkRequired(fieldValue)) {
                errorMessage = errorRequiredText;
            } else if (!checkDate(fieldValue)) {
                errorMessage = errorDateFormat;
            } else if (checkDateIfAfter(fieldValue, getNowDate())) {
                errorMessage = formValidationKeys.futureDate;
            }
        }
        if (fieldName === "endDate" && checkRequired(fieldValue)) {
            if (!checkDate(fieldValue)) {
                errorMessage = errorDateFormat;
            } else if (checkDateIfAfter(rental.startDate, fieldValue)) {
                errorMessage = formValidationKeys.earlyDate;
            }
        }
        return errorMessage;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            const
                rentalSubmit = rental,
                currentFormMode = formModeHook
            let
                promise,
                response;
            rentalSubmit.endDate = rentalSubmit.endDate === "" ? null : rentalSubmit.endDate;
            if (currentFormMode === formMode.NEW) {
                promise = addRentalApiCall(rentalSubmit)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(rentalSubmit)
                promise = updateRentalApiCall(rentalIdHook, rentalSubmit)
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
                                const errorsResponse = {client_id: "", record_id: "", startDate: "", endDate: ""}
                                for (let i = data.error.errors.length - 1; i >= 0; i--) {
                                    const errorItem = data.error.errors[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = formatFieldName(errorItem.path)
                                    errorsResponse[fieldName] = errorMessage;
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
        const formRental = rental;
        const formErrors = errors;
        for (let fieldName in formRental) {
            const fieldValue = formRental[formatFieldName(fieldName)];
            const errorMessage = validateField(formatFieldName(fieldName), fieldValue);
            formErrors[formatFieldName(fieldName)] = errorMessage;
        }
        const formErrors2 = {...formErrors}
        setErrors(formErrors2);
        return !hasErrors();
    }

    const hasErrors = () => {
        for (const fieldName in errors) {
            if (errors[formatFieldName(fieldName)].length > 0) {
                return true;
            }
        }
        return false;
    }

    const navigate = useNavigate();
    if (redirect) {
        const currentFormMode = formModeHook;
        const notice = currentFormMode === formMode.NEW ?
            t("rental.form.add.confirm.text") : t("rental.form.edit.confirm.text");
        return (
            navigate("/rentals", {
                state: notice,
            })
        )
    }

    const errorsSummary = hasErrors() ? t(getValidationErrorKey("formErrors")) : "";
    const fetchError = error ? `${t("render.error")} ${message}` : "";
    const pageTitle = formModeHook === formMode.NEW ?
        t("rental.form.add.pageTitle") : t("rental.form.edit.pageTitle");
    const globalErrorMessage = errorsSummary || fetchError || message


    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="client">{t("rental.fields.client")}<span className="symbol-required">*</span></label>
                <select name="client" id="client" onChange={handleChange} required>
                    <option value="">{t("rental.fields.clientDefaultOption")}</option>
                    {allClients.map(client =>
                        (<option key={client._id} value={client._id}
                                 label={client.firstName + " " + client.lastName}
                                 selected={formModeHook === formMode.EDIT && client._id === rental.client_id ? "selected" : ""}>
                        </option>)
                    )}
                </select>
                <span id="errorClient" className="errors-text">{t(getValidationErrorKey(errors.client_id))}</span>

                <label htmlFor="record">{t("rental.fields.record")}<span className="symbol-required">*</span></label>
                <select name="record" id="record" onChange={handleChange} required>
                    <option value="">{t("rental.fields.recordDefaultOption")}</option>
                    {allRecords.map(record =>
                        (<option key={record._id} value={record._id}
                                 label={record.recordName + " - " + record.artistName}
                                 selected={formModeHook === formMode.EDIT && record._id === rental.record_id ? "selected" : ""}>
                        </option>)
                    )}
                </select>
                <span id="errorRecord" className="errors-text">{t(getValidationErrorKey(errors.record_id))}</span>

                <FormInput
                    type="date"
                    label={t("rental.fields.startDate")}
                    required
                    error={errors.startDate}
                    name="startDate"
                    onChange={handleChange}
                    value={rental.startDate ? getFormattedDate(rental.startDate) : ""}
                />

                <FormInput
                    type="date"
                    label={t("rental.fields.endDate")}
                    error={errors.endDate}
                    name="endDate"
                    onChange={handleChange}
                    value={rental.endDate ? getFormattedDate(rental.endDate) : ""}
                />

                <FormButtons
                    formMode={formModeHook}
                    error={globalErrorMessage}
                    cancelPath="/rentals"
                />
            </form>
        </main>
    );
}


export default RentalForm