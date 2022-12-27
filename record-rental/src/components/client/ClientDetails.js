import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getClientByIdApiCall} from "../../apiCalls/clientApiCalls";
import ClientDetailsData from "./ClientDetailsData";

function ClientDetails() {
    let {clientId} = useParams();
    clientId = parseInt(clientId);
    const [clientIdHook, setClientIdHook] = useState(clientId);
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
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
        fetchClientDetails()
    }, []);

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych klienta...</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <ClientDetailsData clientData={client} />
    }

    return (
        <main>
            <h2>Szczegóły klienta</h2>
            {content}
            <Link to="/clients" className="button-back">Powrót</Link>
        </main>
    );
}

export default ClientDetails