/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, Mayank Sharma, Jian Jiao
 *
 * The Questionnaire component defines a collection of questions. These
 * will be visible when questionnaires are fillable.
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