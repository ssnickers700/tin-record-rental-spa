import React from "react";
import {Link, useLocation} from "react-router-dom";
import {getRentalsApiCall} from "../../apiCalls/rentalApiCalls";
import {useEffect, useState} from "react";
import RentalListTable from "./RentalListTable";

function RentalList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rentals, setRentals] = useState([]);
    const location = useLocation();
    const popupClassName = location.state ? "popup" : "";
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
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych wynajmów...</p>;
    } else if (!rentals.length) {
        content = <p>Brak danych wynajów</p>;
    } else {
        content = <RentalListTable rentalList={rentals} />
    }

    return (
        <>
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