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


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Slider } from '@material-ui/core';

import Question from './Question'

import * as API from '../api/api'

import "../styles/questionnaire.css";
import '../styles/main.css'

export default function Questionnaire({ nextStep }) {
    const { register, handleSubmit, errors } = useForm();
    const [ questionnaire, setQuestionnaire ] = useState({
        questionnaireId: '',
        title: '',
        description: '',
        questions: [],
        isStandard: true,
    });

    useEffect(() => {
        API.getQuestionnaires()
            .then(res => {
                console.log(res[0])
                setQuestionnaire(res[0])
            })
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        setQuestionnaire('UVin');
    }

    return (
        <form onSubmit={onSubmit} className="questionaire-container">
            <h1>{questionnaire.title}</h1>
            {
                questionnaire.questions.map(q =>  (
                <Question
                    isMCQ={q.isMCQ}
                    mcqOptions={q.mcqOptions}
                    rangeOptions={q.rangeOptions}
                />))
            }


            <button
                className={errors.code ? "button-disabled" : "button"}
            >
                E N T E R
            </button>
            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
}