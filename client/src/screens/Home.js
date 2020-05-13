/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The Home screen component defines our screen for the route '/'. This
 * will be the first screen users will see when they visit our 
 * application.
 *
 * This file is used to display the Home screen.
 *
 */

import React, { Component } from 'react';

// Import styles.
import '../styles/home.css';
import NonLinearSlider from '../components/NonLinearSlider';


class Home extends Component {
    
    
    // ---------------------------------------------------------------
    // This method defines the elements for this component.
    // ---------------------------------------------------------------
    render() {
        return(
            <div className='home'>
                <h1>Pediatric SSQ</h1>
                <h3>Welcome</h3>
                <h4>H O M E</h4>
                <NonLinearSlider/>
            </div>
        )
    }
}

export default Home