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

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";


// Import styles.
import './styles/main.css';

// Import screens.
import Home from './screens/Home';

// Import components.
import NavBar from './components/Navbar';


function App() {
    const { loading } = useAuth0();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='app-container'>
                <Router>
                    <NavBar />
                    <Route
                        path='/' exact
                        render={() => (
                            <Home />
                        )}
                    />
                </Router>
            </div>
    );
  }

export default App;
