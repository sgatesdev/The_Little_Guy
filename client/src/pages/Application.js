import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

const Application = () => {
    const initialState = {
        firstName: "",
        middleInitial: "",
        lastName: "",
        income: null,
        currentAddress: "",
        otherTenants: [],
        creditScore: null,
    }
    const [formState, setFormState] = useState(initialState);
    const [displayError, setDisplayError] = useState(null);


    const inputChange = async (e) => {
        console.log('change')
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('formSubmitted')
    }
    return (
        <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">Tenant Application</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
    
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">First Name</span> 
                  </label>
                  <input
                    name="F"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Street Address"
                    autoComplete="streetAddress"
                    value={formState.firstName}
                    onChange={inputChange}
                  />
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Middle Intial</span> 
                  </label>
                  <input
                    name="addressCity"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address City"
                    autoComplete="addressCity"
                    value={formState.middleInitial}
                    onChange={inputChange}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Last Name</span> 
                  </label>
                  <input
                    name="addressState"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address State"
                    autoComplete="addressState"
                    value={formState.lastName}
                    onChange={inputChange}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Gross Anual Income</span> 
                  </label>
                  <input
                    name="addressZip"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address Zipcode"
                    autoComplete="addressZip"
                    value={formState.income}
                    onChange={inputChange}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Use Current Address?</span> 
                  </label>
                  <input
                    name="rent"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Rent"
                    autoComplete="rent"
                    value={formState.currentAddress}
                    onChange={inputChange}
                  />
                </div>
                </div>

                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address">
                  <span class="m-2 text-sm">Property description</span> 
                  </label>
                  <textarea 
                    name="description"
                    type="textarea"
                    class="form-textarea mt-1 block w-full" 
                    rows="10" 
                    placeholder="Enter a property description here"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formState.creditScore}
                    onChange={inputChange}
                  >
                  </textarea>
                </div>
                </div>    
              </div>
              <div>
              <label className="mt-2 text-center text-sm text-gray-600">{ displayError ? displayError : null}</label>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  </span>
                  Sign up!
                </button>
              </div>
            </form>
          </div>
          </div>
    )
};

export default Application;
