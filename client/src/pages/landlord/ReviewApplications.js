import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';

import { QUERY_APPLICATIONS } from '../../apollo-client/queries'

import { FETCH_APPLICATIONS } from '../../store/actions';

const ReviewApplications = () => {
    const dispatch = useDispatch();

    const applications = useSelector((state) => Object.values(state.applications));

    const { loading, data } = useQuery( QUERY_APPLICATIONS );

    useEffect(() => {
        if(applications.length === 0 && data) {
            dispatch({
                type: FETCH_APPLICATIONS,
                payload: data.myApplications
            })
        }
    }, [loading, data, dispatch]);

    const renderApplications = () => {
        console.log(applications)
            return applications.map(app => {
                return (
                <>
                <div className="p-2 text-center" key={app._id}>{app.applicant.firstName} {app.applicant.lastName}</div>
                <div className=" p-2 text-center col-span-2">{app.propertyId.addressStreet}</div>
                <div className=" p-2 text-center">
                    {
                        app.status ? app.status : 'Pending'
                    }
                </div>
                <div className=" p-2 text-center">
                    <Link to={`/landlord/applications/${app._id}`}>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">View</button>
                    </Link>
                </div>
                </> 
            );
        });
    }

    return (
        <div className="w-full flex justify-center mt-2">
        <div className="grid grid-cols-5 gap-1 sm:w-full lg:w-1/2">
        {/* COLUMN HEADERS */}
        <div className="bg-gray-400 p-2 rounded-md text-center col-span-5">Pending Applications</div>
        { /* RENDER CONTENT HERE */ }
        { applications ? renderApplications() : null }
        </div>
        </div>
    )
}

export default ReviewApplications;