import React from "react";
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive? "active": ''}>Strona główna</NavLink></li>
                <li><NavLink to="/clients" className={({ isActive }) => isActive? "active": ''}>Klienci</NavLink></li>
                <li><NavLink to="/records" className={({ isActive }) => isActive? "active": ''}>Płyty</NavLink></li>
                <li><NavLink to="/rentals" className={({ isActive }) => isActive? "active": ''}>Wynajmy</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation