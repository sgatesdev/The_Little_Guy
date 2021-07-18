import React from 'react'
import { useMutation } from '@apollo/client';

import { FETCH_APPLICATIONS } from '../../apollo-client/mutations'

const renderApplications = () => {
    
}

const ReviewApplications = () => {
    useEffect(() => {
        // fetch applications here 

        // dispatch to redux 

        // display all of them below 
    });

    return (
        <div className="w-full flex justify-center mt-2">
        <div className="grid grid-cols-4 gap-1 w-1/2">
        {/* COLUMN HEADERS */}
        <div className="bg-gray-400 p-2 rounded-lg text-center">Date</div>
        <div className="bg-gray-400 p-2 rounded-lg text-center">Name</div>
        <div className="bg-gray-400 p-2 rounded-lg text-center">Address</div>
        <div className="bg-gray-400 p-2 rounded-lg text-center">Controls</div>
        { /* RENDER CONTENT HERE */ }
        { renderApplications() }
        </div>
        </div>
    )
}

export default ReviewApplications;