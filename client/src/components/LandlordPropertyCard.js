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
<div className="mt-10 wrapper m-4 antialiased">
<div> 
 <div className="relative px-4 -mt-16  ">
   <div className="bg-white p-6 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0]} class="object-cover object-center rounded-lg shadow-md m-1.5 w-52 h-52"/>
    <div className="flex items-baseline">
      <div className="m-auto bg-TLGOrange p-0.5 rounded-full uppercase text-xs font-semibold tracking-wider">
    {formatPrice(price)}/month
  </div>  
    </div>
    <h4 className="mt-1 text-l font-semibold uppercase leading-tight truncate">{ addressStreet}</h4>
  <div className="mt-1">
    <span className=" text-sm">{`${addressCity}, ${addressState} ${addressZip}`}</span>
  </div>
  
  <Link to={`/landlord/edit/${_id}`}>
  <button className="bg-TLGOrange text-white m-1 hover:bg-white hover:text-TLGOrange font-semibold py-2 px-4 rounded">Manage</button>  
  </Link> 
  <Link to={`/landlord/delete/${_id}`}>
  <button className="bg-TLGOrange text-white m-1 hover:bg-white hover:text-TLGOrange font-semibold py-2 px-4 rounded">Delete</button>  
  </Link>
  </div>
 </div> 
 </div>
  </div>

    );
};

export default LandlordPropertyCard;
 