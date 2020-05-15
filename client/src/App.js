/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The App component defines our application. This will the brain of
 * our application. Most of our logic functions will be located here.
 *
 * This file is used to initialize everything.
 *
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

// Import styles.
import "./styles/main.css";

// Import screens.
import Landing from "./screens/Landing";
import HomeClinician from "./screens/HomeClinician";
import HomeParents from "./screens/HomeParents";
import HomeAdmin from "./screens/HomeAdmin";

// Import components.
import NavBar from "./components/Navbar";

function App() {
    // const { loading } = useAuth0();

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="app-container">
            <Router>
                <NavBar />
                <Switch>
                    <Route 
                        path="/" 
                        exact 
                        render={() => <Landing />} 
                    />
                    <Route
                        path="/clinician"
                        exact
                        render={() => <HomeClinician />}
                    />
                    <Route
                        path="/parent"
                        exact
                        render={() => <HomeParents />}
                    />
                    <Route 
                        path="/admin" 
                        exact 
                        render={() => <HomeAdmin />} 
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
