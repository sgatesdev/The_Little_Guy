import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
    return properties.length ? (
        <div class="uk-child-width-1-1 uk-text-center uk-animation-fade">
            {
                properties.map((property) => {
                    return <PropertyCard property={ property } />
                })
            }
        </div>
    ) : null;
}

export default PropertyList;