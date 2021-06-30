import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

// new stuff for redux 
import { useDispatch } from 'react-redux';

// import history
import history from '../config/history';

// import apollo query
//import { ADD_USER } from '../apollo-client/mutations';
import { saveToken } from '../utils/token';
import { checkEmail, checkName } from '../utils/helpers';

/**
 * SEP OF CONCERNS - SHIFT SOME FUNCTIONS TO EXTERNAL FILE AFTER THIS IS WORKING (actions folder?)
 */

export const Signup = () => {
    // redux / global state
    const dispatch = useDispatch();

    // apollo client
    //const [addUser, { error }] = useMutation(ADD_USER);

    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        password_2: '',
        firstName: '',
        lastName: ''
    });

    const [formError, setFormError] = useState(null);

    const handleForm = async (e) => {
        e.preventDefault();

        // check for for errors
        setFormError(null);

        // destructure state
        const {
            email,
            password,
            password_2,
            firstName,
            lastName
        } = formState;

        // make sure values are filled in and valid
        if(email === '' || password === '' || password_2 === '' || firstName === '' || lastName === '') {
            return setFormError('Please enter all information!');
        }

        if(!checkEmail(email)) {
            return setFormError('Invalid email address!');
        }

        if(!checkName(firstName) || !checkName(lastName)) {
            return setFormError('Invalid first or last name!');
        }

        if(password !== password_2) {
            return setFormError('Passwords don\'t match!');
        }

        // if the input is valid, send it to server
        try {
            /** 
            const userData = await addUser({
                variables: {
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                }
            });

            const token = userData.data.login.token;

            // save token to LocalStorage
            saveToken(token);
            */

            // send user data to redux so all components can see it
            // do not send password
            const reduxData = { firstName, lastName, email };

            dispatch({
                type: 'LOG_IN',
                payload: { ...reduxData }
            });
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


            <div className="uk-margin">
            <label className="uk-form-label">
                { /**error ? 'Error creating this account' : null **/}
                { formError }
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