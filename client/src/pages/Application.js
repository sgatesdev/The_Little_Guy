import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import {ADD_APPLICATION} from '../apollo-client/mutations'
import history from '../config/history';

const Application = (props) => {
  const user = useSelector((state) => state.user);
  const propertyId = props.match.params.id ;

  const initialState = {
    applicant: user?._id,
    first: user?.firstName,
    last: user?.lastName,
    income: '',
    street: 'street',
    city: 'city',
    state: 'null',
    zip: 'null',
    otherTenants: '',
    creditScore: '',
    employer: '',
    typeOfEmployment: '',
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const applicationInput = {
      propertyId: propertyId,
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
    history.push('/');
  }
  return (
    <div className="flex h-screen bg-white-200 items-center justify-center  mt-32 mb-32">
      <form className="grid bg-whitesmoke rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2" onSubmit={handleFormSubmit}>
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Tenant Application</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >First Name</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="first"
              type="text"
              placeholder="First"
              value={formState.first}
              onChange={inputChange}
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Last Name</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="last"
              type="text"
              placeholder="Last"
              value={formState.last}
              onChange={inputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Street Address</label>
          <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            name="street"
            type="text"
            placeholder="123 Maple St"
            value={formState.street}
            onChange={inputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">City</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="city"
              type="text"
              placeholder="city"
              value={formState.city}
              onChange={inputChange}
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">State</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="state"
              type="text"
              placeholder="state"
              value={formState.state}
              onChange={inputChange}
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Zipcode</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="zip"
              type="text"
              placeholder="111111"
              value={formState.zip}
              onChange={inputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Credit Score</label>
          <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            name="creditScore"
            type="text"
            placeholder="680"
            value={formState.creditScore}
            onChange={inputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Annual Gross Income</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="income"
              type="text"
              placeholder="ex.34,000"
              value={formState.income}
              onChange={inputChange}
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7 ">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Other Tenants</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="otherTenants"
              type="text"
              placeholder="0"
              value={formState.otherTenants}
              onChange={inputChange}
            />
            <div className="lowercase md:tect-xs text-xs text-gray-500 ">*The address for this applicatin will be taken from the property you currently live in* </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Employer</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="employer"
              type="text"
              placeholder="ex.34,000"
              value={formState.employer}
              onChange={inputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Type of Employment
            </label>
            <select className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={formState.typeOfEmployment}
              name='typeOfEmployment'
              onChange={inputChange}>
              {typeOfEmployment.map((option, idx) => (
                <option key={idx}className="py-2 px-3 rounded-lg border-2 border-purple-300 " value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
          <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Cancel</button>
          <button className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2' type='submit'>Apply</button>
        </div>

      </form>
    </div >
  )
};

export default Application;
