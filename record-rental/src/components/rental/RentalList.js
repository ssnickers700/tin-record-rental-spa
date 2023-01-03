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
    const location = useLocation();
    const popupClassName = location.state ? "popup" : "";
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

    if (error) {
        content = <p>{t("rendering.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych wynajmów...</p>;
    } else if (!rentals.length) {
        content = <p>Brak danych wynajów</p>;
    } else {
        content = <RentalListTable
            rentalList={rentals}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteRentalId={setDeleteRentalId}
        />
    }

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>Czy na pewno chcesz usunąć wynajem?</p>
                    <Link onClick={
                        deleteRentalApiCall(deleteRentalId)
                    } className="confirm-popup-yes-button">Tak</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">Anuluj</Link>
                </div>
            }
            <div className={popupClassName}>{location.state}</div>
            <main>
                <h2>Lista wynajmów</h2>
                {content}
                <Link to="/rentals/add" className="button-add">Dodaj nowy wynajem</Link>
            </main>
        </>
    )
}

export default RentalList