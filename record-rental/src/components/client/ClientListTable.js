import React from "react";
import ClientListTableRow from "./ClientListTableRow";
import {useTranslation} from "react-i18next";

function ClientListTable(props) {
    const clients = props.clientList;
    const { t } = useTranslation();

    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t("client.fields.firstName")}</th>
                <th>{t("client.fields.lastName")}</th>
                <th>{t("client.fields.email")}</th>
                <th>{t("list.actions.title")}</th>
            </tr>
            </thead>
            <tbody>
            {clients.map(client =>
                <ClientListTableRow
                    clientData={client}
                    key={client._id}
                    toggleConfirmPopup={props.toggleConfirmPopup}
                    confirmPopup={props.confirmPopup}
                    setDeleteClientId={props.setDeleteClientId}
                />
            )}
            </tbody>
        </table>
    );
}

export default ClientListTable