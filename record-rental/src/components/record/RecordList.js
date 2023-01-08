import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {deleteRecordApiCall, getRecordsApiCall} from "../../apiCalls/recordApiCalls";
import RecordListTable from "./RecordListTable";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function RecordList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [records, setRecords] = useState([])
    const [confirmPopup, toggleConfirmPopup] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState(null);
    const [deletePopup, toggleDeletePopup] = useState(false);
    const [deletePopupText, setDeletePopupText] = useState(null);
    const location = useLocation();
    const popupClassName = location.state || deletePopup ? "popup" : "";
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        content = <p>{t("render.error")}{error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t("render.loading")}</p>;
    } else if (!records.length) {
        content = <p>{t("record.list.noData")}</p>;
    } else {
        content = <RecordListTable
            recordList={records}
            toggleConfirmPopup={toggleConfirmPopup}
            confirmPopup={confirmPopup}
            setDeleteRecordId={setDeleteRecordId}
            toggleDeletePopup={toggleDeletePopup}
            setDeletePopupText={setDeletePopupText}
        />
    }

    useEffect(() => {
        fetchRecordList();
    }, []);

    useEffect(() => {
        fetchRecordList();
    }, [confirmPopup]);

    return (
        <>
            {confirmPopup &&
                <div id="confirm-popup-delete">
                    <p>{t("record.popup.question")}</p>
                    <Link onClick={async () => {
                        deleteRecordApiCall(deleteRecordId);
                        await new Promise(r => setTimeout(r, 200));
                        toggleConfirmPopup(!confirmPopup);
                        toggleDeletePopup(true);
                        setDeletePopupText(t("record.popup.confirmText"))
                    }} className="confirm-popup-yes-button">{t("yes")}</Link>
                    <Link onClick={() =>
                        toggleConfirmPopup(!confirmPopup)
                    } className="confirm-popup-cancel-button">{t("form.actions.cancel")}</Link>
                </div>
            }
            <div className={popupClassName}>{location.state || deletePopupText}</div>
            <main>
                <h2>{t("record.list.title")}</h2>
                {content}
                {isAuthenticated() && <Link to="/records/add" className="button-add">{t("record.list.addNew")}</Link>}
            </main>
        </>
    )
}

export default RecordList