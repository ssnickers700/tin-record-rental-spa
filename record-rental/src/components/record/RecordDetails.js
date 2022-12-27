import React,{useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import {getRecordByIdApiCall} from "../../apiCalls/recordApiCalls";
import RecordDetailsData from "./RecordDetailsData";

function RecordDetails() {
    let {recordId} = useParams();
    recordId = parseInt(recordId);
    //const record = getRecordByIdApiCall(recordId);
    const [recordIdHook, setRecordIdHook] = useState(recordId);
    const [record, setRecord] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    let content;

    const fetchRecordDetails = () => {
        getRecordByIdApiCall(recordIdHook)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setRecord(null);
                        setMessage(data.message);
                    } else {
                        setRecord(data);
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
        fetchRecordDetails();
    }, []);

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych płyt...</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <RecordDetailsData recordData={record} />
    }


    return (
        <main>
            <h2>Szczegóły płyty</h2>
            {content}
            <Link to="/records" className="button-back">Powrót</Link>
        </main>
    );
}

export default RecordDetails