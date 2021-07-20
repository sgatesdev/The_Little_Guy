import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../apollo-client/mutations';
import { LockClosedIcon } from '@heroicons/react/solid'

// password not stored in redux 

const Password = () => {
    const [changePassword, { error }] = useMutation(CHANGE_PASSWORD);
    const [displayError, setDisplayError] = useState(null);
    
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        newPassword: '',
        newPassword2: '',
        
    });
    const handleInput = (e) => {
        let { name, value } = e.target;

        setFormState({
            ...formState, 
            [name]: value
        });
    }
    

    const handleForm = async (e) => {
        e.preventDefault();
        setDisplayError(null);
        const {
            email,
            password,
            newPassword,
            newPassword2
        } = formState;

        // make sure values are filled in and valid
        if(email === '' || password === '' || newPassword === '' || newPassword2 === '') {
            return setDisplayError('Please enter all information!');
        }

        if(newPassword !== newPassword2) {
            return setDisplayError('Passwords don\'t match!');
        }
        try {
            const userData = await changePassword({
                email: email,
                password: password,
                newPassword: newPassword,
            })}
            catch (err) {
                return setDisplayError(`${err}`);
            }
    }

    
    return (
        <div className="min-h-screen flex justify-center bg-CPgray px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-64 w-auto"
                src={`${process.env.PUBLIC_URL}/assets/theLittleGuyCrop.png`}
                alt="TLG"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold">Change your password</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleForm}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only">
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
                <div>
                  <label className="sr-only">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                    placeholder="Current Password"
                    value={formState.password}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only">
                    New Password
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={formState.newPassword}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Repeat New Password
                  </label>
                  <input
                    name="newPassword2"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange focus:z-10 sm:text-sm"
                    placeholder="Repeat New Password"
                    value={formState.newPassword2}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div>
              <label className="mt-2 text-center text-sm">{ displayError ? displayError : null}</label>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-white group-hover:text-TLGOrange" aria-hidden="true" />
                  </span>
                  Change Password
                </button>
              </div>
            </form>
            {/* <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{state.user ? state.user.firstName : null}</h1> */}
          </div>
        </div>
      )
    }

export default Password;
