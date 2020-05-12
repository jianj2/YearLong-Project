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

import React from 'react';

import { useAuth0 } from "../react-auth0-spa";


// Import styles.
import '../styles/home.css';


const ClinicianHome = () => {


    
    // ---------------------------------------------------------------
    // This method defines the elements for this component.
    // ---------------------------------------------------------------
   
        const { loading, user } = useAuth0();

        if (loading || !user) {
          return <div>Loading...</div>;
        }

        return(
            <div className='clinicianHome'>
                <h1>Pediatric SSQ</h1>
                <h3>Welcome Clinician!</h3>
                <h2>{user.name}</h2>
                <h4>H O M E</h4>
            </div>
        );
    
}

export default ClinicianHome