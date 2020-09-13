import React, {Component, useState} from 'react';
import {adminLogin, findPassword} from "../utils/api";

const FindPassword = () => {

    const [email, setEmail] = useState();

    const findEmail = (email)=>{
        alert(email);
        findPassword(email);
    }
        return (
            <div>
                <input type="text" onChange={(event)=>{setEmail(event.target.value)}}/>
                <button onClick={()=>{findEmail(email)}}>submit</button>
            </div>
        );
    }

export default FindPassword;