/**
 * very basic home page working
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import { useQuery } from '@apollo/client';
//import { QUERY_ALL_PROPERTIES } from '../apollo-client/queries';

import { UPDATE_PROPERTIES } from '../store/actions';

import PropertyList from '../components/PropertyList';

const testData = [
    {
        id: "123123123123",
        addressStreet: "100 Elm St",
        addressCity: "Raleigh",
        addressZip: 27615,
        price: 100000,
        imageLink: 'https://via.placeholder.com/150'
    },
    {
        id: "123123123123",
        addressStreet: "101 Elm St",
        addressCity: "Raleigh",
        addressZip: 27614,
        price: 100100,
        imageLink: 'https://via.placeholder.com/150'
    },
    {
        id: "123123123123",
        addressStreet: "300 Elm St",
        addressCity: "Raleigh",
        addressZip: 27613,
        price: 100300,
        imageLink: 'https://via.placeholder.com/150'
    }
];

export const Home = () => {
    // redux
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        dispatch({
            type: UPDATE_PROPERTIES,
            payload: testData
        })
    }, [dispatch]);

    console.log(state.properties)

    // apollo
    //const { loading, data } = useQuery(QUERY_ALL_PROPERTIES);

    /** pull property data on load, send to redux store
    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PROPERTIES,
                payload: data.properties
            })
        }
    }, [data, loading, dispatch]);
    */ 

    return (
        <>
        <h1 class="uk-heading-small uk-flex uk-flex-center">{ state.user ? `Welcome back, ${state.user.username}!` : null }</h1>
        <div className="uk-flex uk-flex-center uk-width-1-1 uk-margin-top">
        <PropertyList />
        </div>
        </>
    );
}