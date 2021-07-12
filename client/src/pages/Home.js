/**
 * very basic home page working
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_PROPERTIES } from '../apollo-client/queries';

import { FETCH_ALL_PROPERTIES } from '../store/actions';

import PropertyList from '../components/PropertyList';

export const Home = () => {
    // redux
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const properties = useSelector((state) => Object.values(state.properties));

    // apollo
    const { loading, data } = useQuery(QUERY_ALL_PROPERTIES);

    // pull property data on load, send to redux store
    useEffect(() => {
        if(data) {
            dispatch({
                type: FETCH_ALL_PROPERTIES,
                payload: data.allProperties
            })
        }
    }, [data, loading, dispatch]); 

    return (
        <>
        <h1 className="flex items-center justify-center font-bold text-3xl my-4">{ user ? `Welcome back, ${user.firstName}!` : null }</h1>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div>
        <PropertyList properties={properties}/>                
        </div>
        </div>
        </>
    );
}


