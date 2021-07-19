import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import {ADD_APPLICATION} from '../apollo-client/mutations'

const Application = ({ propertyId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialState = {
    applicant: user?._id,
    first: user?.firstName,
    last: user?.lastName,
    income: null,
    street: 'street',
    city: 'city',
    state: 'null',
    zip: 'null',
    otherTenants: null,
    creditScore: null,
    employer: null,
    typeOfEmployment: null,
    pets: []
  }
  const typeOfEmployment = [
    {
      label: "Self-Employed",
      value: "self-employed",
    },
    {
      label: "Employed",
      value: "employed",
    },
    {
      label: "Unemployed",
      value: "unemployed",
    },
  ];
 
  const [formState, setFormState] = useState(initialState);
  const [displayError, setDisplayError] = useState(null);
  const [newApplication] = useMutation(ADD_APPLICATION);

  const inputChange = async (e) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value });
  }
  // adds tenants to the array of tenants to be used on submit to add to the form state before sending it to the backend

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const applicationInput = {
      applicant: formState.applicant,
      addressStreet: formState.street,
      addressCity: formState.city,
      addressState: formState.state,
      addressZip: formState.addressZip,
      applicantFirstName: formState.first,
      applicantLastName: formState.last,
      grossAnnualIncome: parseInt(formState.income),
      otherTenants: parseInt(formState.otherTenants),
      creditScore: parseInt(formState.creditScore),
      employer: formState.employer,
      typeOfEmployment: formState.typeOfEmployment,
    }
    const res = await newApplication({ variables: {input: applicationInput}});
    console.log(res);
  }
  return (
    <>

          <div className="min-h-screen flex  justify-center py-20 bg-CPgray py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6">Tenant Application</h3>
              <p className="mt-1 text-sm">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleFormSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        name="first"
                        type="text"
                        placeholder="First"
                        value={formState.first}
                        onChange={inputChange}
                        autoComplete="given-name"
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        name="last"
                        type="text"
                        placeholder="Last"
                        value={formState.last}
                        onChange={inputChange}
                        autoComplete="family-name"
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium">
                        Street address
                      </label>
                      <input
                        name="street"
                        type="text"
                        placeholder="123 Maple St"
                        value={formState.street}
                        onChange={inputChange}
                        autoComplete="street-address"
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        placeholder="city"
                        value={formState.city}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        State
                      </label>
                      <input
                        name="state"
                        type="text"
                        placeholder="state"
                        value={formState.state}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        ZIP code
                      </label>
                      <input
                        name="zip"
                        type="text"
                        placeholder="111111"
                        value={formState.zip}
                        onChange={inputChange}
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Credit Score
                      </label>
                      <input
                        name="creditScore"
                        type="text"
                        placeholder="680"
                        value={formState.creditScore}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Annual Gross Income
                      </label>
                      <input
                        name="income"
                        type="text"
                        placeholder="ex.34,000"
                        value={formState.income}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Other Tenants
                      </label>
                      <input
                        name="otherTenants"
                        type="text"
                        placeholder="0"
                        value={formState.otherTenants}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium">
                        Employer
                      </label>
                      <input
                        name="employer"
                        type="text"
                        placeholder="IBM"
                        value={formState.employer}
                        onChange={inputChange}
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium">
                        Type of Employment
                      </label>
                      <select
                        value={typeOfEmployment}
                        name='typeOfEmployment'
                        onChange={inputChange}
                        className="mt-1 block w-full py-2 px-3 border  bg-white rounded-md shadow-sm focus:outline-none focus:ring-TLGOrange focus:border-TLGOrange sm:text-sm"
                      >
                        {typeOfEmployment.map(option => (
                            <option  value={option.value}>{option.label}</option>
              ))}
                      </select>
                    </div>
                    
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
};

export default Application;
