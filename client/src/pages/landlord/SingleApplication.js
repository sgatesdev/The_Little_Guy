
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_APPLICATION, UPDATE_TENANT } from '../../apollo-client/mutations';

import { EDIT_APPLICATIONS, EDIT_MY_PROPERTY } from '../../store/actions';

import history from '../../config/history';

const SingleApplication = (props) => {
    // set up basic data for redux
    const dispatch = useDispatch();
    const application = useSelector((state) => state.applications[props.match.params.id]);

    // apollo config 
    const [updateApplication, { error }] = useMutation( UPDATE_APPLICATION );
    const [updateTenant] = useMutation(UPDATE_TENANT);

    // set local state for displayError
    const [displayError, setDisplayError] = useState(null);

    const handleApplication = async (newStatus) => {
        try {
            // update application and application state
            await updateApplication({
                variables: { 
                    _id: application._id, 
                    status: newStatus
                }
            });

            dispatch({
                type: EDIT_APPLICATIONS,
                payload: { _id: application._id, status: newStatus }
            });

            // ONLY IF APPROVED
            // update property records and state 
            if(newStatus === 'Approved') {
                await updateTenant({
                    variables: { 
                        _id: application.propertyId._id, 
                        tenant: application.applicant._id
                    }
                });

                dispatch({
                    type: EDIT_MY_PROPERTY,
                    payload: { 
                        _id: application.propertyId._id, 
                        tenant: {
                            firstName: application.applicant.firstName,
                            lastName: application.applicant.lastName
                        }
                    }
                })
            }

            // redirect user
            history.push('/landlord/applications');
        }
        catch {
            setDisplayError(error);
        }
    }

    return !application ? null : (
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
            <form onSubmit={(e) => e.preventDefault()}>
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
                        value={application.applicant.firstName}
                        readOnly
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
                         value={application.applicant.lastName}
                         readOnly
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
                        placeholder=""
                        value={application.addressStreet}
                        readOnly
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
                        placeholder=""
                        value={application.addressCity}
                        readOnly
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
                        placeholder=""
                        value={application.addressState}
                        readOnly
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
                        placeholder=""
                        value={application.addressZip}
                        readOnly
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
                        placeholder=""
                        value={application.creditScore}
                        readOnly
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
                        placeholder=""
                        value={application.grossAnnualIncome}
                        readOnly
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
                        placeholder=""
                        value={application.otherTenants}
                        readOnly
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
                        placeholder=""
                        value={application.employer}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium">
                        Type of Employment
                      </label>
                      <input
                        name="typeOfEmployment"
                        type="text"
                        placeholder=""
                        value={application.typeOfEmployment}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <label className="block text-sm font-medium">
                        { displayError }
                  </label>
                <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
            onClick={() => history.push('/landlord/applications')}
            >
                Back
            </button>

            <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Approved')}
            >
                Approve</button>
            <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Denied')}
            >
                Deny</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

    )
    };

    export default SingleApplication;

