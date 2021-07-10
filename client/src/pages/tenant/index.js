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
          {
                !state.user || !state.user.current_property ? 
                null : (
                  <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="pl-3">
                    <p class="text-sm font-semibold">
                      Pay rent
                    </p>
                  </div>
                </a>
              )
          }
          </div>
        </div>
      </div>
    );

}


//<PropertyCard property={state.user.current_property} />
//    return state.user && state.user.current_property ? 
//null : (<h1>False</h1>);
