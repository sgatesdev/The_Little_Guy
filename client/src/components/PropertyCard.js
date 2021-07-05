import React from 'react';
import { formatPrice
 } from '../utils/helpers';
const PropertyCard = ({ property }) => {
    const {
        _id,
        addressStreet,
        addressCity,
        addressState,
        addressZip,
        price,
        imageLink,
        description   
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
                    <h3 class="uk-card-title uk-margin-remove">{ addressStreet }</h3>
                    {`${addressCity}, ${addressState} ${addressZip}`}
                    <p className="uk-margin-remove">{ formatPrice(price) }</p>
                    <p className="uk-text-left">{ description }</p>
                    <p className="uk-text-left">{ `posted by ` }</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default PropertyCard;
 