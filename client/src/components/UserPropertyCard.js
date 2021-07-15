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
<div className="width-100 mt-10 wrapper bg-gray-400 antialiased text-gray-900" key= {`${_id}`}>
<div> 
 <div className="relative px-4 -mt-16  ">
   <div className="bg-white p-6 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0]} width="150" height="150" />
    <div className="flex items-baseline">
      <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        {!firstName ? null : `${firstName} ${lastName}` }
      </span>
      <div className="ml-2 text-teal-600 uppercase text-xs font-semibold tracking-wider">
    {formatPrice(price)}/month
  </div>  
    </div>
    <h4 className="mt-1 text-l font-semibold uppercase leading-tight truncate">{ addressStreet}</h4>
  <div className="mt-1">
    <span className="text-gray-600 text-sm">{`${addressCity}, ${addressState} ${addressZip}`}</span>
  </div>
  <div className="mt-4">
    <span className="text-sm text-gray-600">{description}</span>
  </div>  
  </div>
 </div> 
</div>
  </div>

    );
};

export default UserPropertyCard;
 