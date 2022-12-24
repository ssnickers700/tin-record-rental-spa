import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/" className="active">Strona główna</Link></li>
                <li><Link to="/clients">Klienci</Link></li>
                <li><Link to="/records">Płyty</Link></li>
                <li><Link to="/rentals">Wynajmy</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation