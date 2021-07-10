import React from 'react';
import ImageUpload from "../../components/ImageUpload";

import { useSelector} from 'react-redux';

export const TenantProfile = () => {
    const state = useSelector((state) => state);

    return(
        <div>

        <div class="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
          <div class="text-center p-6  border-b">
            <img class="h-24 w-24 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/24.jpg" alt="Randy Robertson" />
            <p class="pt-2 text-lg font-semibold">
              {state.user.firstName + ' ' + state.user.lastName}
            </p>
            <p class="text-sm text-gray-600">
            {state.user.email}
            </p>
          </div>
          <div class="border-b">

          <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                House icon                
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Update current address
                </p>
              </div>
            </a>
            
            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Email icon                
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Change email
                </p>
              </div>
            </a>

            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Picture icon
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Update profile picture
                </p>
              </div>
            </a>

            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Bio icon          
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Update bio
                </p>
              </div>
            </a>

            <a href="#" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div class="w-8 h-8 bg-blue-700 rounded-full text-center align-middle text-white text-lg content-center">
                Lock icon
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                    Change password
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
