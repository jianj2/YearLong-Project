


import React from 'react';
import { useForm } from 'react-hook-form';

import "../styles/parents.css";
import '../styles/main.css'

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