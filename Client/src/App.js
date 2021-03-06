// Import Libraries.
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Import Screens
import Landing from "./screens/Landing";
import HomeClinician from "./screens/HomeClinician";
import HomeParents from "./screens/HomeParents";
import HomeAdmin from "./screens/HomeAdmin";
import FindPassword from "./screens/FindPassword";
// Import Components
import { NavBar } from "./components/Commons";
// Import Styles
import "./styles/admin.css";
import "./styles/clinician.css";
import "./styles/clinicianDoTheTest.css";
import "./styles/contentpanel.css";
import "./styles/countryList.css";
import "./styles/landing.css";
import "./styles/main.css";
import "./styles/managequestionnaires.css";
import "./styles/navbar.css";
import "./styles/organisationList.css";
import "./styles/parents.css";
import "./styles/questionnaire.css";
import "./styles/questionnaireList.css";
import "./styles/sidebar.css";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The App component defines our application. This will the brain of
 * our application. Most of our logic functions will be located here.
 *
 * This file is used to initialize everything.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const App = () => {

    return (
        <div className="app-container">
            <Router>
                <NavBar/>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <Landing/>}
                    />
                    <Route
                        path="/participant/:shareId"
                        exact
                        render={() => <HomeParents/>}
                    />
                    <Route
                        path="/admin"
                        exact
                        render={() => <HomeAdmin active={1}/>}
                    />
                    <Route
                        path="/admin/Questionnaires"
                        exact
                        render={() => <HomeAdmin active={1}/>}
                    />
                    <Route
                        path="/admin/SSQ_Instructions"
                        exact
                        render={() => <HomeAdmin active={2}/>}
                    />
                    <Route
                        path="/admin/Organisation"
                        exact
                        render={() => <HomeAdmin active={3}/>}
                    />
                    <Route
                        path="/admin/Organisation/:country"
                        exact
                        render={({ match }) => <HomeAdmin active={7}
                                                          countryName={match.params.country}/>}
                    />
                    <Route
                        path="/admin/Organisation/:country/:name"
                        exact
                        render={({ match }) => (<HomeAdmin active={8}
                                                           organName={match.params.name}/>)}
                    />
                    <Route
                        path="/admin/Questionnaire/standard/:id/edit"
                        exact
                        render={({ match }) => (<HomeAdmin active={4}
                                                           questionnaireID={match.params.id}/>)}
                    />
                    <Route
                        path="/admin/Questionnaire/standard/:id/view"
                        exact
                        render={({ match }) => <HomeAdmin active={5}
                                                          questionnaireID={match.params.id}/>}
                    />
                    <Route
                        path="/admin/SSQ_Instructions/:type/edit"
                        exact
                        render={({ match }) => <HomeAdmin active={6}
                                                          instructionType={match.params.type}/>}
                    />
                    <Route
                        path="/clinician"
                        exact
                        render={() => <HomeClinician active={1}/>}
                    />
                    <Route
                        path="/clinician/Questionnaires"
                        exact
                        render={() => <HomeClinician active={1}/>}
                    />
                    <Route
                        path="/clinician/DoTheTest"
                        exact
                        render={() => <HomeClinician active={2}/>}
                    />
                    <Route
                        path="/clinician/Share"
                        exact
                        render={() => <HomeClinician active={6}/>}
                    />
                    <Route
                        path="/clinician/Instructions"
                        exact
                        render={() => <HomeClinician active={3}/>}
                    />
                    <Route
                        path="/clinician/Questionnaire/:id/edit"
                        exact
                        render={({ match }) => (<HomeClinician active={4}
                                                               questionnaireID={match.params.id}/>)}
                    />
                    <Route
                        path="/clinician/Questionnaire/:id/view"
                        exact
                        render={({ match }) => <HomeClinician active={5}
                                                              questionnaireID={match.params.id}/>}
                    />
                    <Route
                        path="/findPassword"
                        exact
                        render={() => <FindPassword/>}
                    />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
