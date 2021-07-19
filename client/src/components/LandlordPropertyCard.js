import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

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
<div className="mt-10 wrapper m-4 bg-CPgray antialiased">
<div> 
 <div className="relative px-4 -mt-16  ">
   <div className="bg-white p-6 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0]} width="150" height="150" class="object-cover object-center rounded-lg shadow-md m-1.5"/>
    <div className="flex items-baseline">
      <div className="ml-10 bg-TLGOrange p-0.5 rounded-full uppercase text-xs font-semibold tracking-wider">
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
  <Link to={`/landlord/edit/${_id}`}>
  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Manage</button>  
  </Link> 
  <Link to={`/landlord/delete/${_id}`}>
  <button className="bg-white ml-1 hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-red-400 rounded shadow">Delete</button>  
  </Link>
  </div>
 </div> 
 </div>
  </div>

    );
};

export default LandlordPropertyCard;
 