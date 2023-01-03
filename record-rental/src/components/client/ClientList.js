import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {deleteClientApiCall, getClientsApiCall} from "../../apiCalls/clientApiCalls";
import ClientListTable from "./ClientListTable";
import {useTranslation} from "react-i18next";

function ClientList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const [confirmPopup, toggleConfirmPopup] = useState(false);
    const [deleteClientId, setDeleteClientId] = useState(null);
    const location = useLocation();
    const popupClassName = location.state ? "popup" : "";
    const { t } = useTranslation();
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
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych klientów...</p>;
    } else if (!clients.length) {
        content = <p>Brak danych klientów</p>;
    } else {
        content = <ClientListTable
            clientList={clients}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteClientId={setDeleteClientId}
        />
    }

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>Czy na pewno chcesz usunąć klienta?</p>
                    <Link onClick={
                        deleteClientApiCall(deleteClientId)
                    } className="confirm-popup-yes-button">Tak</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">Anuluj</Link>
                </div>
            }
            <div className={popupClassName}>{location.state}</div>
            <main>
                <h2>Lista klientów</h2>
                {content}
                <Link to="/clients/add" className="button-add">Dodaj nowego klienta</Link>
            </main>
        </>
    );
}

export default ClientList