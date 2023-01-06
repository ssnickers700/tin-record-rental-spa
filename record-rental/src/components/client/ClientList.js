import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {deleteClientApiCall, getClientsApiCall} from "../../apiCalls/clientApiCalls";
import ClientListTable from "./ClientListTable";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function ClientList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const [confirmPopup, toggleConfirmPopup] = useState(false);
    const [deleteClientId, setDeleteClientId] = useState(null);
    const [deletePopup, toggleDeletePopup] = useState(false);
    const [deletePopupText, setDeletePopupText] = useState(null);
    const location = useLocation();
    const popupClassName = location.state || deletePopup ? "popup" : "";
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
        fetchClientList();
    }, []);

    useEffect(() => {
        fetchClientList();
    }, [confirmPopup]);

    if (error) {
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (!clients.length) {
        content = <p>{t("client.list.noData")}</p>;
    } else {
        content = <ClientListTable
            clientList={clients}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteClientId={setDeleteClientId}
            toggleDeletePopup={toggleDeletePopup}
            setDeletePopupText={setDeletePopupText}
        />
    }

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>{t("client.popup.question")}</p>
                    <Link onClick={() => {
                        deleteClientApiCall(deleteClientId);
                        toggleConfirmPopup(!confirmPopup);
                        toggleDeletePopup(true);
                        setDeletePopupText(t("client.popup.confirmText"))
                    }} className="confirm-popup-yes-button">{t("yes")}</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">{t("form.actions.cancel")}</Link>
                </div>
            }
            <div className={popupClassName}>{location.state || deletePopupText}</div>
            <main>
                <h2>{t("client.list.title")}</h2>
                {content}
                {isAuthenticated() && <Link to="/clients/add" className="button-add">{t("client.list.addNew")}</Link>}
            </main>
        </>
    );
}

export default ClientList