import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getClientsApiCall} from "../../apiCalls/clientApiCalls";
import ClientListTable from "./ClientListTable";

function ClientList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clients, setClients] = useState([])
    const clientList = getClientsApiCall();
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
        content = <p>Ładowanie danych pracowników...</p>;
    } else {
        content = <ClientListTable clientList={clients} />
    }

    return (
        <main>
            <h2>Lista klientów</h2>
            {content}
            <Link to="/clients/add" className="button-add">Dodaj nowego klienta</Link>
        </main>
    );
}

export default ClientList