import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropertyCard from "../../components/PropertyCard";

export const Landlord = () => {
    const state = useSelector((state) => state);

    console.log(state)


    return(
        <>
        <h1 class="text-2xl m-2 text-center font-bold leading-tight">
            Landlord Portal!
        </h1>
        <h1 className="p-5">
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
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>        
                </div>
                <div class="pl-3">
                  <p class="text-sm font-semibold">
                    Add property
                  </p>
                </div>
              </a>
  
              <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
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