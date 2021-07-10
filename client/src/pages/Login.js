import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LockClosedIcon } from '@heroicons/react/solid'


// new stuff for redux 
import { useDispatch, useSelector } from 'react-redux';

// import history
import history from '../config/history';

// import apollo query
import { LOGIN } from '../apollo-client/mutations';
import { saveToken } from '../utils/token';

/**
 * SEP OF CONCERNS - SHIFT SOME FUNCTIONS TO EXTERNAL FILE AFTER THIS IS WORKING (actions folder?)
 */

export const Login = () => {
    // redux / global state
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
  
    // local state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(null);

    // apollo client
    const [login, { error }] = useMutation(LOGIN);

    const handleForm = async (e) => {
        e.preventDefault();
          
        // integrating graphQL
        try {

            const userData = await login({
                variables: {
                    email, 
                    password
                }
            });

            const token = userData.data.login.token;
            const userDataRes = userData.data.login.user;
            console.log(userData.data);
            //console.log(userDataRes);

            // save token to LocalStorage
            saveToken(token);

            //  send user data to redux so all components can see it
            dispatch({
                type: 'LOG_IN',
                payload: { ...userDataRes, email }
            });
        }
        catch(err) {
            // if there's a problem keep user on page and display error
            console.log(err)
            return setDisplayError('Incorrect username or password!');
        }

        history.push('/');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-64 w-auto"
            src={`${process.env.PUBLIC_URL}/assets/theLittleGuyCrop.png`}
            alt="TLG"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign up
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
          <label className="mt-2 text-center text-sm text-gray-600">{ displayError ? displayError : null}</label>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{state.user ? state.user.firstName : null}</h1>
      </div>
    </div>
  )
}