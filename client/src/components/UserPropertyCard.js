import React from 'react';
import {Image} from 'cloudinary-react';

import { formatPrice} from '../utils/helpers';
const UserPropertyCard = ({ property }) => {
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
    
    const { firstName, lastName } = property.owner;
      
    return(
<div class="width-100 mt-10 m-4 bg-CPgray antialiased text-gray-900">
<div> 
 <div class="relative px-4 -mt-16 ">
   <div class="bg-white p-6 m-4 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0] ? images[0] : 'the-little-guy/fauxhaus_whjtnp'} width="150" height="150" class="object-cover object-center rounded-lg shadow-md m-1.5" alt="property"/>  
    <div class="flex items-baseline">
      <span class="bg-teal-200 text-teal-800 text-xs p inline-block rounded-full  uppercase font-semibold tracking-wide">
        {!firstName ? null : `${firstName} ${lastName}` }
      </span>
      <div class="ml-2 bg-TLGOrange p-0.5 rounded-full uppercase text-xs text-white font-semibold tracking-wider">
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
  </div>
 </div> 
</div>
  </div>

    );
};

export default UserPropertyCard;
 