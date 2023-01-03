import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getClientByIdApiCall} from "../../apiCalls/clientApiCalls";
import ClientDetailsData from "./ClientDetailsData";
import {useTranslation} from "react-i18next";

function ClientDetails() {
    let {clientId} = useParams();
    clientId = parseInt(clientId);
    const [clientIdHook, setClientIdHook] = useState(clientId);
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();
    let content;

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
        fetchClientDetails();
    }, []);

    if (error) {
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <ClientDetailsData clientData={client} />
    }

    return (
        <main>
            <h2>{t("client.form.details.pageTitle")}</h2>
            {content}
            <Link to="/clients" className="button-back">{t("form.actions.return")}</Link>
        </main>
    );
}

export default ClientDetails