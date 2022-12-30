import React from "react";
import {Link, NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Strona główna</NavLink></li>
                <li><NavLink to="/clients" activeClassName="active">Klienci</NavLink></li>
                <li><NavLink to="/records" activeClassName="active">Płyty</NavLink></li>
                <li><NavLink to="/rentals" activeClassName="active">Wynajmy</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation