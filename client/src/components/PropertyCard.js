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
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid">
            <div class="uk-card-media-left uk-cover-container">
                <img src={ imageLink } alt="" class="uk-cover" />
                <canvas width="300" height="200"></canvas>
            </div>
            <div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">{ addressStreet }</h3>
                    <p>{ price }</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default PropertyCard;
 