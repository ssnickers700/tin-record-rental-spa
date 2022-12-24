import React from "react";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="/" className="active">Strona główna</a></li>
                <li><a href="/clients">Klienci</a></li>
                <li><a href="/records">Płyty</a></li>
                <li><a href="/rentals">Wynajmy</a></li>
            </ul>
        </nav>
    )
}

export default Navigation