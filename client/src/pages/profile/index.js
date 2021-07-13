import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const state = useSelector((state) => state);

    return(
        <div>

        <div class="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
          <div class="text-center p-6  border-b">
            <img class="h-24 w-24 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/24.jpg" alt="User Picture" />
            <p class="pt-2 text-lg font-semibold">
              {state.user.firstName + ' ' + state.user.lastName}
            </p>
            <p class="text-sm text-gray-600">
            {state.user.email}
            </p>
          </div>
          <div class="border-b">
            
            <Link to="/profile/email" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd" />
                </svg>        
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Change email
                </p>
              </div>
            </Link>

            <Link to="/profile/picture" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Update profile picture
                </p>
              </div>
            </Link>

            <Link to="/profile/bio" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>      
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                  Update bio
                </p>
              </div>
            </Link>

            <Link to="/profile/password" class="px-6 py-3 hover:bg-gray-200 flex"> 
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
              </div>
              <div class="pl-3">
                <p class="text-sm font-semibold">
                    Change password
                </p>
              </div>
            </Link>

          </div>
          <div class="border-b">
          </div>
        </div>
      </div>
    );
}

export default Profile;