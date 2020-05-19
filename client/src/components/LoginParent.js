/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The LoginParent component defines the login form for the parents
 * and children. This will visible when the user selects the parents/
 * children option at the landing page.
 *
 * This file is used to display the login form.
 *
 */


import React from 'react';

import { useForm } from 'react-hook-form';


// Import styles.
import "../styles/admin.css";
import "../styles/main.css";

export default function LoginParent({ nextStep }) {
    const { register, handleSubmit, errors } = useForm(); 

    const onSubmit = (data) => {
        console.log(data)
        nextStep();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="parents-form">
            <label>Write your unique code?</label>
            <input
                name="code"
                placeholder="C O D E"
                ref={register({
                    required: "You must enter a code.",
                    minLength: {
                        value: 6,
                        message: "The minimum length should be 6.",
                    },
                    maxLength: {
                        value: 8,
                        message: "The maximum length should be 8.",
                    },
                })}
            />

            <button
                className={errors.code ? "button-disabled" : "button"}
            >
                E N T E R
            </button>
            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
}