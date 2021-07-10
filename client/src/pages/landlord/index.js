import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropertyCard from "../../components/PropertyCard";

export const Landlord = () => {
    const state = useSelector((state) => state);

    console.log(state)


    return(
        <>
        <h1>
            Landlord Portal!
        </h1>
        <h1>
            Display a list of landlord's properties each properties tenants, and edit button for each 

            Edit button will take them to a page where they can add a tenant who has applied 

            This can be done by using createUserForProp mutation to create credentials and "send" them to the user and immediately associate user with that property

            OR

            make users apply to the property, then associate them 
        </h1>
          <div>

          <div class="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
            <div class="border-b">
              
              <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
                <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                  House icon             
                </div>
                <div class="pl-3">
                  <p class="text-sm font-semibold">
                    Add property
                  </p>
                </div>
              </a>
  
              <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
                <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                  Letter icon
                </div>
                <div class="pl-3">
                  <p class="text-sm font-semibold">
                    Review applications
                  </p>
                </div>
              </a>
  
            </div>
            <div class="border-b">
            </div>
          </div>

          <div class="text-center p-6  border-b">
              {
                  state.user && state.user.current_property ? 
                  <PropertyCard property={state.user.current_property} /> : (<h1>You don't have any properties to manage yet!</h1>)
              }
            </div>

        </div>
        </>
    );
}