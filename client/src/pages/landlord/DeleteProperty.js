import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// apollo hook
import { useMutation } from '@apollo/client';

// cloudinary
import { Image } from 'cloudinary-react';

// apollo mutations
import { DELETE_IMAGE, DELETE_PROPERTY } from '../../apollo-client/mutations'

// helper formatPrice
import { formatPrice} from '../../utils/helpers';

const DeleteProperty = (props) => {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.landlord[props.match.params.id]);
    // apollo client
    const [deleteProperty, { error }] = useMutation(DELETE_PROPERTY);

    const {
        _id,
        addressStreet,
        addressCity,
        addressState,
        addressZip,
        price,
        images,
        description   
    } = property;

    const deleteProp = async () => {
        await deleteProperty({
            variables: {
                _id: property._id
            }
        })

        // TODO: cloudinary

        // TODO: redux

        // add in redirect
    }

    return (
        <div className="text-center p-6  border-b">
        <div className="mt-10 wrapper bg-gray-400 antialiased text-gray-900">
        <div> 
        <div className="relative px-4 -mt-16  ">
        <div className="bg-white p-6 rounded-lg shadow-lg content-center">
        <div className="flex justify-center">
        <Image className="flex" cloudName="drcmojwwk" publicId={images[0]} width="150" height="150" />
        </div>
        <div className="ml-2 text-teal-600 uppercase text-xs font-semibold tracking-wider">
        {formatPrice(price)}/month
        </div>  
        <h4 className="mt-1 text-l font-semibold uppercase leading-tight truncate">{ addressStreet}</h4>
        <div className="mt-1">
        <span className="text-gray-600 text-sm">{`${addressCity}, ${addressState} ${addressZip}`}</span>
        </div>
        <div className="mt-4">
        <span className="text-sm text-gray-600">{description}</span>
        </div>
        <button 
            onClick={() => deleteProp()}
            className="bg-white ml-1 hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-red-400 rounded shadow"
        >
        Delete
            
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default DeleteProperty;