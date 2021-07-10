import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
    console.log(properties)

    return properties.length ? (
        <div class="flex flex-wrap -mx-4">
            {
                properties.map((property) => {
                    return <PropertyCard property={ property } />
                })                
            }
        </div>
    ) : null;
}

export default PropertyList;

