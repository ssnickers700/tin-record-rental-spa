import React,{useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getRecordByIdApiCall} from "../../apiCalls/recordApiCalls";
import RecordDetailsData from "./RecordDetailsData";
import {useTranslation} from "react-i18next";

function RecordDetails() {
    let {recordId} = useParams();
    recordId = parseInt(recordId);
    const [recordIdHook, setRecordIdHook] = useState(recordId);
    const [record, setRecord] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();
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
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (message) {
        content = <p>{message}</p>;
    } else {
        content = <RecordDetailsData recordData={record} />
    }


    return (
        <main>
            <h2>{t("record.form.details.pageTitle")}</h2>
            {content}
            <Link to="/records" className="button-back">{t("form.actions.return")}</Link>
        </main>
    );
}

export default RecordDetails