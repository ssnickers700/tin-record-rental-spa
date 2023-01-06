import React, {useEffect, useState} from "react"
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ClientList from "./components/client/ClientList";
import ClientDetails from "./components/client/ClientDetails";
import ClientForm from "./components/client/ClientForm";
import RecordList from "./components/record/RecordList";
import RecordDetails from "./components/record/RecordDetails";
import RecordForm from "./components/record/RecordForm";
import RentalList from "./components/rental/RentalList";
import RentalDetails from "./components/rental/RentalDetails";
import RentalForm from "./components/rental/RentalForm";
import formMode from "./helpers/formHelper";
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";
import ProtectedRoute from "./components/other/ProtectedRoute";

function App() {
    const [user, setUser] = useState(undefined);
    const [prevPath, setPrevPath] = useState("");

    const handleLogin = (user) => {
        localStorage.setItem("user", user);
        setUser(user);
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(undefined);
    }

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    return (
        <Router>
            <div>
                <Header/>
                <Navigation handleLogout={handleLogout}/>
                <Routes>
                    <Route path="/" element={<MainContent/>}/>

                    <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>}/>

                    <Route path="/clients" element={<ClientList/>}/>
                    <Route path="/clients/details/:clientId" element={<ClientDetails/>}/>
                    <Route path="/clients/add" element={<ProtectedRoute/>}>
                        <Route path="/clients/add" element={<ClientForm/>}/>
                    </Route>
                    <Route path="/clients/edit/:clientId" element={<ProtectedRoute/>}>
                        <Route path="/clients/edit/:clientId" element={<ClientForm/>}/>
                    </Route>

                    <Route path="/records" element={<RecordList/>}/>
                    <Route path="/records/details/:recordId" element={<RecordDetails/>}/>
                    <Route path="/records/add/" element={<ProtectedRoute/>}>
                        <Route path="/records/add/" element={<RecordForm/>}/>
                    </Route>
                    <Route path="/records/edit/:recordId" element={<ProtectedRoute/>}>
                        <Route path="/records/edit/:recordId" element={<RecordForm/>}/>
                    </Route>

                    <Route path="/rentals" element={<RentalList/>}/>
                    <Route path="/rentals/details/:rentalId" element={<RentalDetails/>}/>
                    <Route path="/rentals/add" element={<ProtectedRoute/>}>
                        <Route path="/rentals/add" element={<RentalForm/>}/>
                    </Route>
                    <Route path="/rentals/edit/:rentalId" element={<ProtectedRoute/>}>
                        <Route path="/rentals/edit/:rentalId" element={<RentalForm/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App
