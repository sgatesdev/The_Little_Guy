import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Image} from 'cloudinary-react';

const Profile = () => {
    const state = useSelector((state) => state);
    console.log(state)

    return(
        <div className="bg-CPgray">

        <div className="bg-HDgray sm:max-w-full max-w-md rounded shadow-md">
          <div className="text-center p-6 ">
            <Image className="h-24 w-24 rounded-full mx-auto" cloudName="drcmojwwk"  publicId={state.user.image} alt="User Picture" />
            <p className="pt-2 text-lg font-semibold">
              {state.user.firstName + ' ' + state.user.lastName}
            </p>
            <p className="text-sm text-gray-600">
            {state.user.email}
            </p>
          </div>
          <div>
            

            <Link to="/profile/update" className="px-6 py-3 hover:bg-TLGOrange flex shadow-md"> 
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>      
              </div>
              <div className="pl-3">
                <p className="text-sm font-semibold">
                  Update profile
                </p>
              </div>
            </Link>

            <Link to="/profile/password" className="px-6 py-3 hover:bg-TLGOrange flex shadow-md"> 
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
              </div>
              <div className="pl-3">
                <p className="text-sm font-semibold">
                    Change password
                </p>
              </div>
            </Link>

          </div>
          <div>
          </div>
        </div>
      </div>
    );
}

export default Profile;