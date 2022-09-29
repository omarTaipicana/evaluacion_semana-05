import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { sendUser } from '../store/slices/users.slice';
import { useNavigate } from "react-router-dom"
import img from "../assets/images/pokebola.gif"



const InputUser = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [inputUser, setInputUser] = useState("")
    const dispatchSendUser = () => {
        dispatch(sendUser(inputUser))
        navigate("/pokedex")
    }

    return (
        <div className='input-content'>
            <div className='input-info'>
                <h1>User Input</h1>
                <p className='register'>
                    Register your name to start
                </p>
                <form onSubmit={dispatchSendUser}>
                    <input
                        className='input-user'
                        type="text"
                        placeholder='your name'
                        value={inputUser}
                        onChange={e => setInputUser(e.target.value)}
                    />
                    <br />
                    <img className='pokebola' onClick={dispatchSendUser} src={img} alt="" />
                </form>
            </div>
        </div>
    );
};

export default InputUser;