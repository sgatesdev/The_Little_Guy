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
        <h1 className="flex items-center justify-center font-bold text-3xl my-4">{ state.user ? `Welcome back, ${state.user.firstName}!` : null }</h1>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div>
        <PropertyList properties={state.properties}/>                
        </div>
        </div>
        </>
    );
}


