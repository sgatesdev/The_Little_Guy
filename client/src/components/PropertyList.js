import React from 'react';
import UserPropertyCard from './UserPropertyCard';
import LandlordPropertyCard from './LandlordPropertyCard';

const PropertyList = ({ properties, isLandlord }) => {
    return properties.length ? (
        <div className="flex flex-wrap -mx-4">
            {
                properties.map((property) => {
                    return isLandlord ? <LandlordPropertyCard property={ property } key={ property._id } /> : <UserPropertyCard property={ property } key={ property._id } />
                })                
            }
        </div>
    ) : null;
}

export default PropertyList;