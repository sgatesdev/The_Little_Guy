import React from 'react';
import PropertyCard from './PropertyCard';

import { useSelector } from 'react-redux';

const PropertyList = () => {
    const state = useSelector((state) => state);

    return state.properties.length ? (
        <div class="uk-child-width-1-1 uk-text-center uk-animation-fade">
            {
                state.properties.map((property) => {
                    return <PropertyCard property={ property } />
                })
            }
        </div>
    ) : null;
}

export default PropertyList;