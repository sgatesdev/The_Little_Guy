import React, { useState } from 'react';
import { Header } from '../components/Header';

// new stuff for redux 
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
    // redux 
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        console.log(`${username} ${password}`);
          
        // we will add local storage stuff here to store token
        // storing basic user info in redux, tested below. it works

        dispatch({
            type: 'LOG_IN',
            payload: { username }
        });
    }

    return (
        <div>
            <Header />
            <form className="uk-form-stacked uk-margin-left" onSubmit={handleForm}>

            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-small" 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div >
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-small" 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="uk-margin">
                <button     
                    type="submit" 
                    className="uk-button uk-button-default"
                >Login</button>
            </div>

            </form>
            <h1>{state.user ? state.user.username : null}</h1>
        </div>
    );
}