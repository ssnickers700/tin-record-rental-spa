import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getRecordsApiCall} from "../../apiCalls/recordApiCalls";
import {getClientsApiCall} from "../../apiCalls/clientApiCalls";
import {getRentalByIdApiCall} from "../../apiCalls/rentalApiCalls";
import RentalDetailsData from "./RentalDetailsData";

function RentalDetails() {
    let {rentalId} = useParams();
    rentalId = parseInt(rentalId);
    const [rentalIdHook, setRentalIdHook] = useState(rentalId);
    const [rental, setRental] = useState(null);
    const [allClients, setAllClients] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    // const rental = getRentalByIdApiCall(rentalId);
    //const allClients = getClientsApiCall();
    const allRecords = getRecordsApiCall();
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

    const fetchClientList = () => {
        getClientsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setAllClients(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetchRentalDetails();
        fetchClientList()
    }, []);


    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych wynajmu...</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <RentalDetailsData rentalData={rental} allClients={allClients} allRecords={allRecords} />
    }

    return (
        <main>
            <h2>Szczegóły wynajmu</h2>
            {content}
            <Link to="/rentals" className="button-back">Powrót</Link>
        </main>
    );
}

export default RentalDetails