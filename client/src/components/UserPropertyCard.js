import React from 'react';
import {Image} from 'cloudinary-react';
import { formatPrice} from '../utils/helpers';
import {Link} from 'react-router-dom';

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
<div className="width-100 mt-10 m-4 bg-CPgray antialiased">
<div> 
 <div className="relative px-4 -mt-16 ">
   <div className="bg-white p-6 m-4 rounded-lg shadow-lg">
   <Image cloudName="drcmojwwk" publicId={images[0] ? images[0] : 'the-little-guy/fauxhaus_whjtnp'} className="w-52 h-52 object-cover object-center rounded-lg shadow-md m-1.5" alt="property"/>  
    <div className="flex items-baseline">
      <span className="text-xs p inline-block rounded-full uppercase font-semibold tracking-wide">
        {!firstName ? null : `${firstName} ${lastName}` }
      </span>
      <div className="ml-2 bg-TLGOrange p-0.5 rounded-full uppercase text-xs text-white font-semibold tracking-wider">
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
  <Link to={`/application/${_id}`} >
      <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"> Apply Now</button>
    </ Link>
  </div>
 </div> 
</div>
</div>

    );
};
export default UserPropertyCard;
 

















