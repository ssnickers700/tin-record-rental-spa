import React, {useState} from "react";
import {loginApiCall} from "../../apiCalls/authApiCalls";
import {checkRequired} from "../../helpers/validationCommon";
import formMode, {formValidationKeys, getValidationErrorKey} from "../../helpers/formHelper";
import {useTranslation, withTranslation} from "react-i18next";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons";
import {useNavigate} from "react-router-dom";

function LoginForm(props) {
    const [user, setUser] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({email: "", password: ""})
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoaded, setIsLoaded] = useState("");
    const [prevPath, setPrevPath] = useState("");
    const navigate = useNavigate()
    const { t } = useTranslation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        const userChange = {...user};
        userChange[name] = value;

        const errorMessage = validateField(name, value);
        const errorsChange = {...errors};
        errorsChange[name] = errorMessage;

        setUser(userChange);
        setErrors(errorsChange);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const userSubmit = user;
            let response;
            loginApiCall(userSubmit)
                .then(res => {
                    response = res;
                    return res.json();
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data);
                                props.handleLogin(userString);
                                navigate(-1);
                            }
                        } else if (response.status === 401) {
                            console.log(401);
                            setMessage(data.message);
                        }
                    },
                    (errors) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "email") {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if (fieldName === "password") {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        return errorMessage;
    }

    const validateForm = () => {
        const formUser = user;
        const formErrors = errors;
        for (const fieldName in formUser) {
            const fieldValue = formUser[fieldName];
            const errorMessage = validateField(fieldName, fieldValue);
            formErrors[fieldName] = errorMessage;
        }
        const formErrors2 = {...formErrors}
        setErrors(formErrors2);
        return !hasErrors();
    }

    const hasErrors = () => {
        for (const errorField in errors) {
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    const errorsSummary = hasErrors() ? t("validation.formErrors") : "";
    const fetchError = error ? `${t("render.error")} ${message}` : "";
    const globalErrorMessage = errorsSummary || fetchError || (message === "notAuth" ? t(getValidationErrorKey(message)) : message);

    return (
        <main>
            <div id="login">
                <h2>{t("auth.pageTitle")}</h2>
                <form className="form" method="post" onSubmit={handleSubmit} noValidate>
                    <FormInput
                        name="email"
                        value={user.email}
                        error={errors.email}
                        label={t("client.fields.email")}
                        onChange={handleChange}
                        type="email"
                    />

                    <FormInput
                        name="password"
                        value={user.password}
                        error={errors.password}
                        label={t("client.fields.password")}
                        onChange={handleChange}
                        type="password"
                    />

                    <FormButtons
                        cancelPath={prevPath}
                        error={globalErrorMessage}
                        formMode={formMode.LOGIN}
                    />
                </form>
            </div>
        </main>
    );
}

export default (withTranslation()(LoginForm))