import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getRentalByIdApiCall} from "../../apiCalls/rentalApiCalls";
import RentalDetailsData from "./RentalDetailsData";
import {useTranslation} from "react-i18next";

function RentalDetails() {
    let {rentalId} = useParams();
    rentalId = parseInt(rentalId);
    const [rentalIdHook, setRentalIdHook] = useState(rentalId);
    const [rental, setRental] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();
    let content;

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

    useEffect(() => {
        fetchRentalDetails();
    }, []);


    if (error) {
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <RentalDetailsData rentalData={rental} />
    }

    return (
        <main>
            <h2>{t("rental.form.details.pageTitle")}</h2>
            {content}
            <Link to="/rentals" className="button-back no-table-button-back">
                {t("form.actions.return")}
            </Link>
        </main>
    );
}

export default RentalDetails