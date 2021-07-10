/**
 * very basic home page working
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_PROPERTIES } from '../apollo-client/queries';

import { UPDATE_PROPERTIES } from '../store/actions';

import PropertyList from '../components/PropertyList';

export const Home = () => {
    // redux
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    // apollo
    const { loading, data } = useQuery(QUERY_ALL_PROPERTIES);

    // pull property data on load, send to redux store
    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PROPERTIES,
                payload: data.allProperties
            })
        }
    }, [data, loading, dispatch]); 

    return (
        <>
        <h1 class="uk-heading-small uk-flex uk-flex-center">{ state.user ? `Welcome back, ${state.user.firstName}!` : null }</h1>
        <div className="uk-flex uk-flex-center uk-width-1-1 uk-margin-top">
        <PropertyList properties={state.properties}/>
        </div>
        </>
    );
}