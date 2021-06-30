import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

// new stuff for redux 
import { useDispatch, useSelector } from 'react-redux';

// import history
import history from '../config/history';

// import apollo query
//import { LOGIN } from '../apollo-client/mutations';
import { saveToken } from '../utils/token';

/**
 * SEP OF CONCERNS - SHIFT SOME FUNCTIONS TO EXTERNAL FILE AFTER THIS IS WORKING (actions folder?)
 */

export const Login = () => {
    // redux / global state
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
  
    // local state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // apollo client
    //const [login, { error }] = useMutation(LOGIN);

    const handleForm = async (e) => {
        e.preventDefault();
        console.log(`${username} ${password}`);
          
        // integrating graphQL
        try {

            //const userData = await login({
            //    variables: {
            //        username: username
            //        password: password
            //    }
            //});

            //const token = userData.data.login.token;

            // save token to LocalStorage
            //saveToken(token);

            // send user data to redux so all components can see it
            dispatch({
                type: 'LOG_IN',
                payload: { username }
            });

        }
        catch(err) {
            console.log(err);
        }

        history.push('/');
    }

    return (
        <div>
            <div className="uk-grid uk-margin-top">
            <div class="uk-width-1-1 uk-flex uk-flex-center">
            <form className="uk-form-stacked uk-margin-left" onSubmit={handleForm}>
            <legend class="uk-legend">Log In</legend>
            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div >
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="uk-margin">
            <label className="uk-form-label">{ /**error ? 'Incorrect username or password' : null**/}</label>
                <button     
                    type="submit" 
                    className="uk-button uk-button-default"
                >Login</button>
            </div>

            </form>
            <h1>{state.user ? state.user.username : null}</h1>
        </div>
        </div>
        </div>
    );
}