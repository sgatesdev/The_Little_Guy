import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

export const ProfileCard = (props) => {
const state = useSelector((state) => state);
    return(
        <>
        <div class="uk-card uk-card-default uk-width-1-2@m">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle uk-grid">
            <div class="uk-width-auto">
                <img class="uk-border-circle" href={`${props.image}`}></img>
            </div>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">{props.firstName, props.lastName}</h3>
                <p class="uk-text-meta uk-margin-remove-top">{ props.is_landlord ? `Landlord`: `Tenant`}</p>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
        <p>{props.bio}</p>
    </div>
    {state.User._id = props._id?
    <div class="uk-card-footer">
        <a href="#" class="uk-button uk-button-text">Read more</a>
    </div>: null}
</div>
</>
    )
};