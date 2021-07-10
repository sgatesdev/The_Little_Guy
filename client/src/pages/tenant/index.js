import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropertyCard from "../../components/PropertyCard";

export const Tenant = () => {
    const state = useSelector((state) => state);

    console.log(state)

    return (
        <div>

        <div class="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
          <div class="text-center p-6  border-b">
            {
                state.user && state.user.current_property ? 
                <PropertyCard property={state.user.current_property} /> : (<h1>You don't have a home yet!</h1>)
            }
          </div>
          <div class="border-b">
            
            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                House icon             
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Apply for a property
                </p>
              </div>
            </a>

            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Money icon
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Pay rent
                </p>
              </div>
            </a>

            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Envelope icon
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Message landlord
                </p>
              </div>
            </a>
          </div>
          <div class="border-b">
          </div>
        </div>
      </div>
    );

}


//<PropertyCard property={state.user.current_property} />
//    return state.user && state.user.current_property ? 
//null : (<h1>False</h1>);
