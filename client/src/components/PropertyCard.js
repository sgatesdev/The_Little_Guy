import React from 'react';

const PropertyCard = ({ property }) => {
    const {
        _id,
        addressStreet,
        addressCity,
        addressState,
        addressZip,
        price,
        imageLink,   
    } = property;

    return(
        <>
        <div>
        <div class="uk-card uk-card-default uk-card-body">{addressStreet} 
        {price}
            </div>
        </div>
        </>
    );
};

export default PropertyCard;
 