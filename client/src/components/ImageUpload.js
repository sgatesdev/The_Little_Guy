import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE, ADD_USER_IMAGE, ADD_PROPERTY_IMAGE } from '../apollo-client/mutations'


const ImageUpload = ({ imageTargetId, typeOfImage }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const [addUserImage] = useMutation(ADD_USER_IMAGE);
    const [addPropertyImage] = useMutation(ADD_PROPERTY_IMAGE);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileInputState(event.target.value);
        setSelectedFile(file);
        previewUploadedFile(file);
    }
    const previewUploadedFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result);
            console.log(previewSource);
        }
    }
    const handleSubmitFile = (event) => {
        event.preventDefault();
        
        if (!previewSource) return;
        uploadImageToCloudinary(previewSource, typeOfImage, imageTargetId);
    }
    const uploadImageToCloudinary = async (base64EncodedImage) => {
        try {
            const { data } = await uploadImage({
                variables: { image: base64EncodedImage }
            });
            const imageString = data.uploadImage;
            console.log(imageString);
            if (imageString) {
                setFileInputState('');
                setPreviewSource('');
                if (typeOfImage === 'user') {
                    const { data } = await addUserImage({ variables: { cloudinaryId: imageString } });
                    console.log(data)
                    return
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
        <div className="uk-card uk-card-default uk-width-1-2@m">
            <form onSubmit={handleSubmitFile}>
                <div class="uk-margin" uk-margin>
                    <div uk-form-custom="target: true">
                        <input type="file" onChange={handleFileUpload} value={fileInputState} />
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                    </div>
                    <button class="uk-button uk-button-default" type='submit'>Submit</button>
                </div>
            </form>
            {previewSource && (
                <img src={previewSource} alt='preview' />
            )}
        </div>
    )
}
export default ImageUpload;