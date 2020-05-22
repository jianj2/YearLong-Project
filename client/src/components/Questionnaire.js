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

import * as API from '../utils/api'

import "../styles/questionnaire.css";
import '../styles/main.css'

export default function Questionnaire({ nextStep }) {
    const { register, handleSubmit, errors } = useForm();
    const [ questionnaire, setQuestionnaire ] = useState({
        questionnaireId: '',
        title: '',
        description: '',
        sections: [],
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
            {questionnaire.sections.map((section) => (
                <div>
                    <h2>{section.title}</h2>
                    {section.questions.map((question) => (
                        <Question
                            isMCQ={question.isMCQ}
                            mcqOptions={question.mcqOptions}
                            rangeOptions={question.rangeOptions}
                        />
                    ))}
                </div>
            ))}

            <button className={errors.code ? "button-disabled" : "button"}>
                E N T E R
            </button>
            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
}