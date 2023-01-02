import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {deleteRecordApiCall, getRecordsApiCall} from "../../apiCalls/recordApiCalls";
import RecordListTable from "./RecordListTable";

function RecordList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [records, setRecords] = useState([])
    const [confirmPopup, toggleConfirmPopup] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState(null);
    const location = useLocation();
    const popupClassName = location.state ? "popup" : "";
    let content;

    const fetchRecordList = () => {
        getRecordsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setRecords(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych płyt...</p>;
    } else if (!records.length) {
        content = <p>Brak danych płyt</p>;
    } else {
        content = <RecordListTable
            recordList={records}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteRecordId={setDeleteRecordId}
        />
    }

    useEffect(() => {
        fetchRecordList()
    }, []);

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>Czy na pewno chcesz usunąć klienta?</p>
                    <Link onClick={
                        deleteRecordApiCall(deleteRecordId)
                    } className="confirm-popup-yes-button">Tak</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">Anuluj</Link>
                </div>
            }
            <div className={popupClassName}>{location.state}</div>
            <main>
                <h2>Lista płyt</h2>
                {content}
                <Link to="/records/add" className="button-add">Dodaj nową płytę</Link>
            </main>
        </>
    )
}

export default RecordList