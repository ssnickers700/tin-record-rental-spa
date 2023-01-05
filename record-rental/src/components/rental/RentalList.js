import React from "react";
import {Link, useLocation} from "react-router-dom";
import {deleteRentalApiCall, getRentalsApiCall} from "../../apiCalls/rentalApiCalls";
import {useEffect, useState} from "react";
import RentalListTable from "./RentalListTable";
import {useTranslation} from "react-i18next";

function RentalList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [confirmPopup, toggleConfirmPopup] = useState(false);
    const [deleteRentalId, setDeleteRentalId] = useState(null);
    const [deletePopup, toggleDeletePopup] = useState(false);
    const [deletePopupText, setDeletePopupText] = useState(null);
    const location = useLocation();
    const popupClassName = location.state || deletePopup ? "popup" : "";
    const { t } = useTranslation();
    let content;

    const fetchRentalList = () => {
        getRentalsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setRentals(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchRentalList();
    }, []);

    useEffect(() => {
        fetchRentalList();
    }, [confirmPopup]);

    if (error) {
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (!rentals.length) {
        content = <p>{t("rental.list.noData")}</p>;
    } else {
        content = <RentalListTable
            rentalList={rentals}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteRentalId={setDeleteRentalId}
            toggleDeletePopup={toggleDeletePopup}
            setDeletePopupText={setDeletePopupText}
        />
    }

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>{t("rental.popup.question")}</p>
                    <Link onClick={() => {
                        deleteRentalApiCall(deleteRentalId);
                        toggleConfirmPopup(!confirmPopup);
                        toggleDeletePopup(true);
                        setDeletePopupText(t("rental.popup.confirmText"))
                    }} className="confirm-popup-yes-button">{t("yes")}</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">{t("form.actions.cancel")}</Link>
                </div>
            }
            <div className={popupClassName}>{location.state || deletePopupText}</div>
            <main>
                <h2>{t("rental.list.title")}</h2>
                {content}
                <Link to="/rentals/add" className="button-add">{t("rental.list.addNew")}</Link>
            </main>
        </>
    )
}

export default RentalList