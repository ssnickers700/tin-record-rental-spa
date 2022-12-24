import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <div>
            <Header/>
            <Navigation/>
            <Switch>
                <Route path="/" component={MainContent} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App
