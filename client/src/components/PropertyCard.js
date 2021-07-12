import React from 'react';
import { formatPrice} from '../utils/helpers';
const PropertyCard = ({ property }) => {
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
        <>
<div class="wrapper bg-gray-400 antialiased text-gray-900" key= {`${_id}`}>
<div> 
 <div class="relative px-4 -mt-16  ">
   <div class="bg-white p-6 rounded-lg shadow-lg">
   <img src='https://via.placeholder.com/150' class="object-cover object-center rounded-lg shadow-md" alt="property"/>  
    <div class="flex items-baseline">
      <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        {`${firstName} ${lastName}` }
      </span>
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
  </div>
 </div> 
</div>
  </div>
</>
    );
};

export default PropertyCard;
 