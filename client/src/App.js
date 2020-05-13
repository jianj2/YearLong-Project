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

// Import styles.
import './styles/main.css';

// Import ccreens.
import Home from './screens/Home';

// Import components.
import Navbar from './components/Navbar';
import NonLinearSlider from './components/NonLinearSlider';



class App extends React.Component {
    constructor (props) {
        super(props);

        // Application state.
        this.state = {

        }
    }

    // ---------------------------------------------------------------
    // This method defines the elements for this component.
    // ---------------------------------------------------------------
    render() {
        return(
            <div className='app-container'>
                <Router>
                    <Navbar />

                    <Route
                        path='/' exact
                        render={() => (
                            <Home />

                        )}
                    />
 

                </Router>
            </div>
        )
    }

}

export default App;
