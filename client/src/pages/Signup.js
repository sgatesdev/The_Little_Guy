import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// tailwind
import { LockClosedIcon } from '@heroicons/react/solid'

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

const Signup = () => {
    // redux / global state
    const dispatch = useDispatch();

    // apollo client
    const [signUp, { error }] = useMutation(SIGN_UP);

    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        email: '',
        username: '',
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
            username,
            password,
            password_2,
            firstName,
            lastName,
            is_landlord
        } = formState;

        // make sure values are filled in and valid
        if(email === '' || username === '' || password === '' || password_2 === '' || firstName === '' || lastName === '') {
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
                    username: username,
                    image: 'the-little-guy/default_profile_pic_m1vhsn',
                    is_landlord: is_landlord
                }
            });

            const token = userData.data.signUp.token;

            // save token to LocalStorage
            saveToken(token);

            // send user data to redux so all components can see it
            // do not send password
            const reduxData = { ...userData.data.signUp.user };

            dispatch({
                type: 'LOG_IN',
                payload: { ...reduxData }
            });
        }
        catch(err) {
            return setDisplayError(`${err}`);
        }

        history.push('/profile/update');
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
    <div className="min-h-screen flex  justify-center bg-CPgray py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-64 w-auto"
            src={`${process.env.PUBLIC_URL}/assets/theLittleGuyCrop.png`}
            alt="TLG"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Sign up for an account</h2>
          <p className="mt-2 text-center text-sm">
            or{' '}
            <Link to="/login" className="font-medium hover:text-TLGOrange">
              Log In
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleForm}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="Email address"
                autoComplete="email"
                value={formState.email}
                onChange={handleInput}
              />
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="Username"
                autoComplete="username"
                value={formState.username}
                onChange={handleInput}
              />
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                First Name 
              </label>
              <input
                name="firstName"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="First name"
                autoComplete="firstName"
                value={formState.firstName}
                onChange={handleInput}
              />
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="Last name"
                autoComplete="lastName"
                value={formState.lastName}
                onChange={handleInput}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formState.password}
                onChange={handleInput}
              />
            </div>


            <div>
              <label htmlFor="password" className="sr-only">
                Confirm password
              </label>
              <input
                name="password_2"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                placeholder="Re-enter Password"
                value={formState.password_2}
                onChange={handleInput}
              />
            </div>

            <div>
                <input 
                          className="form-checkbox my-2 text-TLGOrange focus:ring-TLGOrange focus:border-TLGOrange rounded-md"
                          type="checkbox" 
                          name="is_landlord"
                          value={formState.is_landlord}
                          onChange={handleInput}
                />
                <span class="m-2 text-sm">I am a landlord</span> 
            </div>

          </div>
          <div>
          <label className="mt-2 text-center text-sm text-gray-600">{ displayError ? displayError : null}</label>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-white group-hover:text-TLGOrange" aria-hidden="true" />
              </span>
              Sign up!
            </button>
          </div>
          </div>
          </div>
          </div>
        </form>
      </div>
      </div>
    );
}

export default Signup;