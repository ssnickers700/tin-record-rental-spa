import React from "react";
import {isAuthenticated} from "../../helpers/authHelper";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute() {

    return (
        isAuthenticated() ?
            <Outlet /> :
            <Navigate to={{pathname: "/login"}} />
    );
}

export default ProtectedRoute;