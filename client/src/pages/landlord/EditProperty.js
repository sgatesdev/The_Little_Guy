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
// called EDIT_PROPERTY on client side updateProperties server side
import { UPDATE_PROPERTY } from '../../apollo-client/mutations';
import { EDIT_MY_PROPERTY, EDIT_PROPERTY } from '../../store/actions';

const EditProperty = (props) => {
    // get dispatcher for redux
    const dispatch = useDispatch();
    const oldInfo = useSelector((state) => state.landlord[props.match.params.id]);
    const { firstName, lastName } = useSelector((state) => state.user);
    //console.log(oldInfo)

    // apollo client
    const [updateProperty, { error }] = useMutation(UPDATE_PROPERTY);

    // set initial values so react doesn't get mad at me
    const [formState, setFormState] = useState({
        addressStreet: oldInfo.addressStreet,
        addressCity: oldInfo.addressCity,
        addressState: oldInfo.addressState,
        addressZip: oldInfo.addressZip,
        rent: oldInfo.price,
        description: oldInfo.description
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
        /** make sure PRICE is used when sending - that's what data field is in database */
        const buildInput = {
          addressStreet: addressStreet,
          addressCity: addressCity,
          addressState: addressState,
          addressZip: addressZip,
          price: parseInt(rent),
          description: description
        };


        console.log({ ...buildInput, _id: oldInfo._id });

        // if the input is valid, send it to server
        // server side takes two args _id and input
        try {
          await updateProperty({
              variables: {
                  ...buildInput, _id: oldInfo._id
              }
          });
          // update redux store, add in property ID to object
          dispatch({
              type: EDIT_MY_PROPERTY,
              payload: { _id: oldInfo._id, ...buildInput }
          });
    
          // update redux store, add in property ID to object          
          dispatch({
            type: EDIT_PROPERTY,
            payload: { ...buildInput, _id: oldInfo._id, owner: { firstName, lastName }}
          });

          history.push(`/image/property/${oldInfo._id}`);
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
          <form onSubmit={handleForm}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label className="block text-sm font-medium">
                      Street address
                    </label>
                    <input
                      name="addressStreet"
                      type="text"
                      placeholder="Street Address"
                      autoComplete="streetAddress"
                      value={formState.addressStreet}
                      onChange={handleInput}
                      className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label className="block text-sm font-medium">
                      City
                    </label>
                    <input
                      name="addressCity"
                      type="text"
                      placeholder="Address City"
                  autoComplete="addressCity"
                  value={formState.addressCity}
                  onChange={handleInput}
                      className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium">
                      State
                    </label>
                    <input
                      name="addressState"
                      type="text"
                      placeholder="Address State"
                      autoComplete="addressState"
                      value={formState.addressState}
                      onChange={handleInput}
                      className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium">
                      ZIP code
                    </label>
                    <input
                      name="addressZip"
                      type="text"
                      placeholder="Address Zipcode"
                      autoComplete="addressZip"
                      value={formState.addressZip}
                      onChange={handleInput}
                      className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="block text-sm font-medium">
                      Monthly Rent
                    </label>
                    <input
                      name="rent"
                      type="text"
                      placeholder="Rent"
                      autoComplete="rent"
                      value={formState.rent}
                      onChange={handleInput}
                      className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6">
                    <label className="block text-sm font-medium ">
                      Description
                    </label>
                    <textarea
                      name="description"
                      type="textarea"
                      rows={5}
                      className="shadow-sm focus:ring-TLGOrange focus:border-TLGOrange mt-1 block w-full sm:text-sm border rounded-md"
                      placeholder="Enter a property description here"
                      value={formState.description}
                      onChange={handleInput}
                    />
                  </div>
                  
                </div>
              </div>
              <div>
                    {oldInfo.tenant ? `Current tenant:  ${oldInfo.tenant.firstName} ${oldInfo.tenant.lastName}` : null} 
                </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  
  </>
        );
}
export default EditProperty;
















