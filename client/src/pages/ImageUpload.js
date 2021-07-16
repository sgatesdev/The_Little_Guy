import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation } from '@apollo/client';

import { Image } from 'cloudinary-react';

import { UPLOAD_IMAGE, ADD_USER_IMAGE, ADD_PROPERTY_IMAGE } from '../apollo-client/mutations'

// bring in redux action
import { EDIT_MY_PROPERTY, EDIT_PROPERTY } from '../store/actions';

// import history object
import history from '../config/history';

const ImageUpload = (props) => {
    // initialize state variables for handling data/upload
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState('');

    // set up mutations for graphQL
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const [addUserImage] = useMutation(ADD_USER_IMAGE);
    const [addPropertyImage] = useMutation(ADD_PROPERTY_IMAGE);

    // get route variables to determine if this is property or user image
    const imageTargetId = props.match.params.id;
    const typeOfImage = props.match.params.type;

    // for debugging
    console.log(imageTargetId);
    console.log(typeOfImage);

    // redux
    const dispatch = useDispatch();
    const property = useSelector((state) => state.landlord[imageTargetId]);

    // calls previewUploadedFile, sets state var to prepare file to be uploaded
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setFileInputState(event.target.value);
        setSelectedFile(file);
        previewUploadedFile(file);
    }

    // renders preview of image on page below form
    const previewUploadedFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result);
            console.log(previewSource);
        }
    }

    // event handler for clicking "UPLOAD IMAGE" - sends image to cloudinary
    const handleSubmitFile = (event) => {
        event.preventDefault();
        
        if (!previewSource) return;
        uploadImageToCloudinary(previewSource, typeOfImage, imageTargetId);
    }
    
    // function to handle mechanics of uploading file to Cloudinary
    const uploadImageToCloudinary = async (base64EncodedImage) => {
        try {
            // upload image and pull data from response
            const { data } = await uploadImage({
                variables: { image: base64EncodedImage }
            });

            // get cloudinary URL for stored image, log for debugging
            const imageString = data.uploadImage || 'test';
            console.log(imageString);

            // once we have the cloudinary URL, look at route variables (url string for this page) to see where we want to store ref to image in our database
            // once we know if it's user or property, send the cloudinary URL string to graphQL to store it in our database with the correct user or property record!
            if (imageString) {
                // reset variables
                // TODO: remove this since we are redirecting
                setFileInputState('');
                setPreviewSource('');

                // if type is user, add user image
                // juan already has context adding user id on the backend
                if (typeOfImage === 'user') {
                    await addUserImage({ variables: { cloudinaryId: imageString } });
                    
                    // dispatch cloudinary URL to redux
                    dispatch({
                        type: 'UPDATE_USER',
                        payload: { image: imageString }
                    });

                    // redirect user back to landlord page
                    history.push('/profile');
                }
                else {
                    // send property image to mongo document for that property
                    await addPropertyImage({
                        variables: { _id: imageTargetId, cloudinaryId: imageString }
                    })

                    // dispatch cloudinary URL to redux
                    // FOR NOW: replacing the entire array, IN THE FUTURE would update to account for adding multiple images - this is a FUTURE feature
                    dispatch({
                        type: EDIT_MY_PROPERTY,
                        payload: { _id: imageTargetId, images: [imageString] }
                    });

                    dispatch({
                        type: EDIT_PROPERTY,
                        payload: { _id: imageTargetId, images: [imageString] }
                    });

                    // redirect user back to landlord page
                    history.push('/landlord');
                }
              
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">
            {
                 property.images && property.images.length > 0 ? 'Update your image' : 'Upload an image!'   
            }
        </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmitFile}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <input type="file" onChange={handleFileUpload} value={fileInputState} />
            </div>
            </div>
            <div>
            <label className="mt-2 text-center text-sm text-gray-600">{ /** TODO: ERROR HANDLING HERE */}</label>
            {/***** IMAGE PREVIEW HERE ****/
            previewSource && (
                        <img className="m-5" src={previewSource} alt='preview' />
            )}

            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Upload Image
            </button>
            <button
                onClick={() => history.push('/landlord')}
                className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Continue without image
            </button>
            {/***** CURRENT IMAGE HERE ********/
                property.images && property.images.length > 0 ? 
                <>
                <div>
                <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">Current image</h2>
                </div>
                <Image 
                    cloudName="drcmojwwk" 
                    publicId={property.images[0]} 
                    className="mt-5"
                />
                </> : null

            }
            </div>
        </form>
        </div>
        </div>
    )
}
export default ImageUpload;