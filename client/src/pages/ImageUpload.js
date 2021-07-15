import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { UPLOAD_IMAGE, ADD_USER_IMAGE, ADD_PROPERTY_IMAGE } from '../apollo-client/mutations'

// bring in redux action
import { EDIT_MY_PROPERTY } from '../store/actions';

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
            const imageString = data.uploadImage;
            console.log(imageString);

            // once we have the cloudinary URL, look at route variables (url string for this page) to see where we want to store ref to image in our database
            // once we know if it's user or property, send the cloudinary URL string to graphQL to store it in our database with the correct user or property record!
            if (imageString) {
                setFileInputState('');
                setPreviewSource('');
                if (typeOfImage === 'user') {
                    const { data } = await addUserImage({ variables: { cloudinaryId: imageString } });
                    console.log(data)
                    return;
                }

                await addPropertyImage({
                    variables: { _id: imageTargetId, cloudinaryId: imageString }
                })
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">Upload an Image!</h2>
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
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Upload Image
            </button>
            </div>
        </form>
        {previewSource && (
                        <img src={previewSource} alt='preview' />
        )}
        </div>
        </div>
    )
}
export default ImageUpload;