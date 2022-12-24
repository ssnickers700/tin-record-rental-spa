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
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App
