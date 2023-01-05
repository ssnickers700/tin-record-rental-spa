import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {withTranslation} from "react-i18next";
import i18n from "i18next";


function Navigation() {
    const { t } = useTranslation();

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language, (err, t) => {
            localStorage.setItem("lang", language);
            if (err) return console.log("something went wrong loading", err);
        })
    };

    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive? "active": ''}>{t("nav.main-page")}</NavLink></li>
                <li><NavLink to="/clients" className={({ isActive }) => isActive? "active": ''}>{t("nav.clients")}</NavLink></li>
                <li><NavLink to="/records" className={({ isActive }) => isActive? "active": ''}>{t("nav.records")}</NavLink></li>
                <li><NavLink to="/rentals" className={({ isActive }) => isActive? "active": ''}>{t("nav.rentals")}</NavLink></li>
                <li className="lang"><button onClick={() => handleLanguageChange("pl")}>PL</button></li>
                <li><button onClick={() => handleLanguageChange("en")}>EN</button></li>
            </ul>
        </nav>
    )
}

export default withTranslation()(Navigation);