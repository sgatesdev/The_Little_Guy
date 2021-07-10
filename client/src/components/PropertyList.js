import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
    console.log(properties)

    return properties.length ? (
        <div class="uk-child-width-1-1 uk-text-center uk-animation-fade">
            {
                
            }
        </div>
    ) : null;
}

export default PropertyList;

//properties.map((property) => {
//    return <PropertyCard property={ property } />
//})