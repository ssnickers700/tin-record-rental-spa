import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function ClientListTableRow(props) {
    const client = props.clientData;
    const { t } = useTranslation();
    return (
        <tr>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/clients/details/${client._id}`} className="list-actions-button-details">{t("list.actions.details")}</Link></li>
                    <li><Link to={`/clients/edit/${client._id}`} className="list-actions-button-edit">{t("list.actions.edit")}</Link></li>
                    <li><Link onClick={() => {
                        props.toggleConfirmPopup(!props.confirmPopup)
                        props.setDeleteClientId(client._id);
                    }} className="list-actions-button-delete">{t("list.actions.delete")}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}

export default ClientListTableRow