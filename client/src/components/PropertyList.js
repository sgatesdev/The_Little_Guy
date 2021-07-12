import React from 'react';
import UserPropertyCard from './UserPropertyCard';
import LandlordPropertyCard from './LandlordPropertyCard';

const PropertyList = ({ properties, isLandlord }) => {
    return properties.length ? (
        <div class="flex flex-wrap -mx-4">
            {
                properties.map((property) => {
                    return isLandlord ? <LandlordPropertyCard property={ property } /> : <UserPropertyCard property={ property } />
                })                
            }
        </div>
    ) : null;
}

export default PropertyList;