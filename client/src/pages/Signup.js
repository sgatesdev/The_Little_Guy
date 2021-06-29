import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

// new stuff for redux 
import { useDispatch } from 'react-redux';

// import history
import history from '../config/history';

// import apollo query
//import { ADD_USER } from '../apollo-client/mutations';
import { saveToken } from '../utils/token';

/**
 * SEP OF CONCERNS - SHIFT SOME FUNCTIONS TO EXTERNAL FILE AFTER THIS IS WORKING (actions folder?)
 */

export const Signup = () => {
    // redux / global state
    const dispatch = useDispatch();
  
    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        password_2: '',
    });

    // apollo client
    //const [addUser, { error }] = useMutation(ADD_USER);

    const handleForm = async (e) => {
        e.preventDefault();
          
        // integrating graphQL
        try {
            /** 
            const userData = await addUser({
                variables: {
                    username: formState.username,
                    password: formState.password
                }
            });

            const token = userData.data.login.token;

            // save token to LocalStorage
            saveToken(token);
            */

            // send user data to redux so all components can see it
            dispatch({
                type: 'LOG_IN',
                payload: { ...formState.username }
            });

            console.log(formState)

        }
        catch(err) {
            console.log(err);
        }

        history.push('/');
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState, 
            [name]: value
        });
    }

    return (
        <div>
            <div uk-grid>
            <div class="uk-width-1-1 uk-flex uk-flex-center">
            <form className="uk-form-stacked uk-margin-left" onSubmit={handleForm}>
            
            <legend class="uk-legend">Sign Up</legend>

            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    value={formState.username}
                    onChange={handleInput}
                />
            </div>

            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="text" 
                    placeholder="Email address" 
                    name="email"
                    value={formState.email}
                    onChange={handleInput}
                />
            </div>

            <div >
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={formState.password}
                    onChange={handleInput}
                />
            </div>

            <div >
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="password" 
                    placeholder="Re-enter password" 
                    name="password_2"
                    value={formState.password_2}
                    onChange={handleInput}
                />
            </div>

            <div className="uk-margin">
            <label className="uk-form-label">
                { /**error ? 'Error creating this account' : null **/}
            </label>
                <button     
                    type="submit" 
                    className="uk-button uk-button-default"
                >Sign up!</button>
            </div>

            </form>
        </div>
        </div>
        </div>
    );
}