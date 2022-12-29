import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {getClientsApiCall} from "../../apiCalls/clientApiCalls";
import ClientListTable from "./ClientListTable";

function ClientList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const location = useLocation();
    let redirectNotice = location.state ? location.state : "";
    const popupClassName = location.state ? "popup" : "";
    const [notice, setNotice] = useState(redirectNotice);
    let content;

    const fetchClientList = () => {
        getClientsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setClients(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetchClientList()
    }, []);

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych klientów...</p>;
    } else if (!clients.length) {
        content = <p>Brak danych klientów</p>;
    } else {
        content = <ClientListTable clientList={clients} />
    }

    return (
        <>
            <div className={popupClassName}>{notice}</div>
            <main>
                <h2>Lista klientów</h2>
                {content}
                <Link to="/clients/add" className="button-add">Dodaj nowego klienta</Link>
            </main>
        </>
    );
}

export default ClientList