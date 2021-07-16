import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ALL_PROPERTIES } from '../apollo-client/queries';

import { FETCH_ALL_PROPERTIES } from '../store/actions';

import PropertyList from '../components/PropertyList';

const Home = () => {
    // redux
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const properties = useSelector((state) => Object.values(state.properties));

    // apollo
    //const [fetchProperties, { loading, data }] = useLazyQuery(QUERY_ALL_PROPERTIES);
    const { loading, data } = useQuery(QUERY_ALL_PROPERTIES);

    // pull property data on load, send to redux store
    useEffect(() => {
        //fetchProperties();

        if(data) {
            dispatch({
                type: FETCH_ALL_PROPERTIES,
                payload: data.allProperties
            })
        }
    }, [loading, data, dispatch]); 

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

export default Home;