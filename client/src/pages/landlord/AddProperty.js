import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// tailwind
import { LockClosedIcon } from '@heroicons/react/solid'

// new stuff for redux 
import { useDispatch } from 'react-redux';

// import history
import history from '../../config/history';

// import apollo query
import { SIGN_UP } from '../../apollo-client/mutations';
import { saveToken } from '../../utils/token';

const AddProperty = () => {

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
        <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">Add a property</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleForm}>
              <input type="hidden" name="remember" defaultValue="true" />
    
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Street Address</span> 
                  </label>
                  <input
                    name="addressStreet"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Street Address"
                    autoComplete="streetAddress"
                    value={formState.addressStreet}
                    onChange={handleInput}
                  />
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">City</span> 
                  </label>
                  <input
                    name="addressCity"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address City"
                    autoComplete="addressCity"
                    value={formState.addressCity}
                    onChange={handleInput}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">State</span> 
                  </label>
                  <input
                    name="addressState"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address State"
                    autoComplete="addressState"
                    value={formState.addressState}
                    onChange={handleInput}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Zipcode</span> 
                  </label>
                  <input
                    name="addressZip"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address Zipcode"
                    autoComplete="addressZip"
                    value={formState.addressZip}
                    onChange={handleInput}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Monthly rent</span> 
                  </label>
                  <input
                    name="rent"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Rent"
                    autoComplete="rent"
                    value={formState.rent}
                    onChange={handleInput}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Property description</span> 
                  </label>
                  <input
                    name="description"
                    type="textarea"
                    rows="10"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Description"
                    autoComplete="description"
                    value={formState.description}
                    onChange={handleInput}
                  />
                </div>
                </div>

                <div>
                    <input 
                              className="form-checkbox my-2"
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign up!
                </button>
              </div>
            </form>
          </div>
          </div>
        );
}

export default AddProperty;