import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getRecordsApiCall} from "../../apiCalls/recordApiCalls";
import RecordListTable from "./RecordListTable";

function RecordList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [records, setRecords] = useState([])
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
        content = <RecordListTable recordList={records} />
    }

    useEffect(() => {
        fetchRecordList()
    }, []);

    return (
        <main>
            <h2>Lista płyt</h2>
            {content}
            <Link to="/records/add" className="button-add">Dodaj nową płytę</Link>
        </main>
    )
}

export default RecordList