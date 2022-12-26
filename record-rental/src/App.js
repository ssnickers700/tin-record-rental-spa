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

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<MainContent />} />

                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/clients/details/:clientId" element={<ClientDetails />} />
                    <Route path="/clients/add" element={<ClientForm />} />
                    <Route path="/clients/edit/:clientId" element={<ClientForm />} />

                    <Route path="/records" element={<RecordList />} />
                    <Route path="/records/details/:recordId" element={<RecordDetails />} />
                    <Route path="/records/add/" element={<RecordForm />} />
                    <Route path="/records/edit/:recordId" element={<RecordForm />} />

                    <Route path="/rentals" element={<RentalList />} />
                    <Route path="/rentals/details/:rentalId" element={<RentalDetails />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App
