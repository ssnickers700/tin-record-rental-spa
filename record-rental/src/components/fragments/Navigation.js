import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Navigation() {
    const { t } = useTranslation();
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive? "active": ''}>{t("nav.main-page")}</NavLink></li>
                <li><NavLink to="/clients" className={({ isActive }) => isActive? "active": ''}>{t("nav.clients")}</NavLink></li>
                <li><NavLink to="/records" className={({ isActive }) => isActive? "active": ''}>{t("nav.records")}</NavLink></li>
                <li><NavLink to="/rentals" className={({ isActive }) => isActive? "active": ''}>{t("nav.rentals")}</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation