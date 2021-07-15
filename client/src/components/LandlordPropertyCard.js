import React from 'react';
import { Link } from 'react-router-dom';
import {Image} from 'cloudinary-react';

import { formatPrice} from '../utils/helpers';
const LandlordPropertyCard = ({ property }) => {
    const {
        _id,
        addressStreet,
        addressCity,
        addressState,
        addressZip,
        price,
        images,
        description   
    } = property;
      
    return(
<div class="width-100 mt-10 wrapper bg-gray-400 antialiased text-gray-900" key= {`${_id}`}>
<div> 
 <div class="relative px-4 -mt-16  ">
   <div class="bg-white p-6 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0]} width="150" height="150" />
    <div class="flex items-baseline">
      <div class="ml-2 text-teal-600 uppercase text-xs font-semibold tracking-wider">
    {formatPrice(price)}/month
  </div>  
    </div>
    <h4 class="mt-1 text-l font-semibold uppercase leading-tight truncate">{ addressStreet}</h4>
  <div class="mt-1">
    <span class="text-gray-600 text-sm">{`${addressCity}, ${addressState} ${addressZip}`}</span>
  </div>
  <div class="mt-4">
    <span class="text-sm text-gray-600">{description}</span>
  </div>
  <Link to={`/landlord/edit/${_id}`}>
  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Manage</button>  
  </Link>
  </div>
 </div> 
 </div>
  </div>

    );
};

export default LandlordPropertyCard;
 