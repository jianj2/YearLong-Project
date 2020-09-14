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
import { useAuth0 } from "./utils/react-auth0-spa";
import { AdminAuthProvider } from "./utils/useAdminAuth";

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

    console.log("This is server domain",process.env);
    console.log("This is redirect link",process.env);
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
                        path="/parent/:shareId"
                        exact
                        render={() => <HomeParents />}
                    />
                    <Route
                        path="/admin"
                        exact
                        render={() => <HomeAdmin active ={1}/>}
                    />
                    <Route
                        path="/admin/Questionnaires"
                        exact
                        render={() => <HomeAdmin active = {1}/>}
                    />
                    <Route
                        path="/admin/SSQ_Instructions"
                        exact
                        render={() => <HomeAdmin active = {2} />}
                    />
                    <Route
                        path="/admin/Organisation"
                        exact
                        render={() => <HomeAdmin active = {3} />}
                    />

                    <Route
                        path="/admin/:id/edit"
                        exact
                        render={({match}) => (<HomeAdmin active = {4} questionnaireID={match.params.id}/>)}
                    />


                    <Route
                        path="/admin/standard/:id/view"
                        exact
                        render={({match}) => <HomeAdmin active = {5} questionnaireID={match.params.id}/> }
                    />
                    
                    <Route
                        path="/admin/instruction/:type/edit"
                        exact
                        render={({match}) => <HomeAdmin active = {6} 
                                    instructionType = {match.params.type}/> }
                    />


                    <Route
                        path="/clinician"
                        exact
                        render={() => <HomeClinician active = {1}/>}
                    />
                    <Route 
                        path="/clinician/Questionnaires" 
                        exact 
                        render={() => <HomeClinician active = {1}/>} 
                    />
                    <Route 
                        path="/clinician/DoTheTest" 
                        exact 
                        render={() => <HomeClinician active = {2}/>} 
                    />
                    <Route
                        path="/clinician/Share"
                        exact
                        render={() => <HomeClinician active = {6}/>}
                    />
                    <Route 
                        path="/clinician/Instructions" 
                        exact 
                        render={() => <HomeClinician active = {3}/>} 
                    />
                    <Route
                        path="/clinician/:id/edit" 
                        exact
                        render={({match}) => (<HomeClinician active = {4} questionnaireID={match.params.id}/>)}
                    />

                    <Route
                        path="/standard/:id/view" 
                        exact 
                        render={({match}) => <HomeClinician active = {5} questionnaireID={match.params.id}/> }
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
