import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// tailwind
import { LockClosedIcon } from '@heroicons/react/solid'

// new stuff for redux 
import { useDispatch, useSelector } from 'react-redux';

// import history
import history from '../../config/history';

// import apollo query
import { ADD_PROPERTY } from '../../apollo-client/mutations';

const AddProperty = () => {
    const { firstName, lastName } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // apollo client
    const [addProperty, { error }] = useMutation(ADD_PROPERTY);

    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        addressStreet: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        rent: 0,
        description: ''
    });

    const [displayError, setDisplayError] = useState(null);

    const handleForm = async (e) => {
        e.preventDefault();
        console.log(formState)
        // check for for errors
        setDisplayError(null);

        // destructure state
        const {
            addressStreet,
            addressCity,
            addressState,
            addressZip,
            rent,
            description
        } = formState;

        // make sure values are filled in and valid
        if(addressStreet === '' || addressCity === '' || addressState === '' || addressZip === '' || rent === '' || description === '') {
            return setDisplayError('Please enter all information!');
        }

        const buildInput = {
          addressStreet: addressStreet,
          addressCity: addressCity,
          addressState: addressState,
          addressZip: addressZip,
          price: parseInt(rent),
          description: description,
          images: ['the-little-guy/fauxhaus_whjtnp']
        };

        // if the input is valid, send it to server
        try {
          const propertyData = await addProperty({
              variables: buildInput
          });
          
          const propertyId = propertyData.data.addProperty._id;

          // update redux store, add in property ID to object          
          dispatch({
              type: 'ADD_MY_PROPERTY',
              payload: { ...buildInput, _id: propertyId, images: ['the-little-guy/fauxhaus_whjtnp'] }
          });
    
          // update redux store, add in property ID to object          
          dispatch({
              type: 'ADD_PROPERTY',
              payload: { ...buildInput, _id: propertyId, images: ['the-little-guy/fauxhaus_whjtnp'], owner: { firstName, lastName }}
          });

          history.push(`/image/property/${propertyId}`);
      }
      catch(err) {
          return setDisplayError(`${err}`);
      }
    }

    const handleInput = (e) => {
        let { name, value } = e.target;

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
                  <span className="m-2 text-sm">Street Address</span> 
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
                  <span className="m-2 text-sm">City</span> 
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
                  <span className="m-2 text-sm">State</span> 
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
                  <span className="m-2 text-sm">Zipcode</span> 
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
                  <span className="m-2 text-sm">Monthly rent</span> 
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
                  <span className="m-2 text-sm">Property description</span> 
                  </label>
                  <textarea 
                    name="description"
                    type="textarea"
                    className="form-textarea mt-1 block w-full" 
                    rows="10" 
                    placeholder="Enter a property description here"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formState.description}
                    onChange={handleInput}
                  >
                  </textarea>
                </div>
                </div>
              </div>
              <div className="mb-10 text-center text-sm text-red-600">
                { displayError ? displayError : null}</div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next 
                </button>
              </div>
            </form>
          </div>
          </div>
        );
}

export default AddProperty;