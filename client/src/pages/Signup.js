import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

// new stuff for redux 
import { useDispatch } from 'react-redux';

// import history
import history from '../config/history';

// import apollo query
import { SIGN_UP } from '../apollo-client/mutations';
import { saveToken } from '../utils/token';
import { checkEmail, checkName } from '../utils/helpers';

/**
 * SEP OF CONCERNS - SHIFT SOME FUNCTIONS TO EXTERNAL FILE AFTER THIS IS WORKING (actions folder?)
 */

export const Signup = () => {
    // redux / global state
    const dispatch = useDispatch();

    // apollo client
    const [signUp, { error }] = useMutation(SIGN_UP);

    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        password_2: '',
        firstName: '',
        lastName: '',
        is_landlord: false
    });

    const [displayError, setDisplayError] = useState(null);

    const handleForm = async (e) => {
        e.preventDefault();
        console.log(formState)
        // check for for errors
        setDisplayError(null);

        // destructure state
        const {
            email,
            password,
            password_2,
            firstName,
            lastName,
            is_landlord
        } = formState;

        // make sure values are filled in and valid
        if(email === '' || password === '' || password_2 === '' || firstName === '' || lastName === '') {
            return setDisplayError('Please enter all information!');
        }

        if(!checkEmail(email)) {
            return setDisplayError('Invalid email address!');
        }

        if(!checkName(firstName) || !checkName(lastName)) {
            return setDisplayError('Invalid first or last name!');
        }

        if(password !== password_2) {
            return setDisplayError('Passwords don\'t match!');
        }

        console.log(is_landlord);

        // if the input is valid, send it to server
        try {
            const userData = await signUp({
                variables: {
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    username: `test${Date.now()}`,
                    is_landlord: is_landlord
                }
            });

            const token = userData.data.signUp.token;

            // save token to LocalStorage
            saveToken(token);

            // send user data to redux so all components can see it
            // do not send password
            const reduxData = { firstName, lastName, email, ...userData.data.signUp.user };

            dispatch({
                type: 'LOG_IN',
                payload: { ...reduxData }
            });
        }
        catch(err) {
            return setDisplayError(`${err}`);
        }

        history.push('/');
    }

    const handleInput = (e) => {
        let { name, value } = e.target;

        if(e.target.name === 'is_landlord') {
            value = e.target.checked;
        }

        setFormState({
            ...formState, 
            [name]: value
        });
    }

    return (
        <div className="uk-animation-fade">
            <div className="uk-grid uk-margin-top">
            <div class="uk-width-1-1 uk-flex uk-flex-center">
            <form className="uk-form-stacked uk-margin-left" onSubmit={handleForm}>
            
            <legend class="uk-legend">Sign Up</legend>

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

            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="text" 
                    placeholder="First Name" 
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInput}
                />
            </div>

            <div>
                <label className="uk-form-label"></label>
                <input 
                    className="uk-input uk-form-width-medium" 
                    type="text" 
                    placeholder="Last Name" 
                    name="lastName"
                    value={formState.lastName}
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

            <div className="uk-margin-top">
            <label className="uk-form-label">
                <input 
                    type="checkbox" 
                    name="is_landlord"
                    value={formState.is_landlord}
                    onChange={handleInput}
                /> I am a landlord</label>
            </div>


            <div className="uk-margin">
            <label className="uk-form-label">
                { displayError ? displayError : null }
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