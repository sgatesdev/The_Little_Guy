import React, { useState } from 'react';
import { ADD_USER_IMAGE, ADD_PROPERTY_IMAGE } from '../apollo-client/mutations';
import { useMutation } from '@apollo/client';


const ImageUpload = ({ imageTargetId, typeOfImage }) => {
    const [fileInput, setFileInput] = useState('');
    const [previewedFile, setPreviewedFile] = useState(''); 
    const [selectedFile, setSelectedFile] = useState('')
    const [addUserImage, imageData] = useMutation(ADD_USER_IMAGE);
    const [addPropertyImage, propertyData] = useMutation(ADD_PROPERTY_IMAGE);
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(selectedFile, 'loggin in handle file upload');
        setFileInput(event.target.value);
        setSelectedFile(file);
        previewUploadedFile(file);
    }
    const previewUploadedFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file)
        reader.onloadend = () => {
            setPreviewedFile(reader.result);

        }
    }
    const handleSubmitFile = (event) => {
        event.preventDefault();
        if (!previewedFile) return;
        // const reader = new FileReader();
        // reader.readAsDataURL(selectedFile);
        // reader.onloadend = () => {}
        uploadImage(previewedFile);
    }
    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await fetch('/api/uploadImage', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' }
            })
            const imageID = res.public_id
            switch (typeOfImage) {
                case 'user':
                    await addUserImage(imageTargetId, imageID);
                    break;
                case 'property':
                    await addPropertyImage(imageTargetId, imageID);
                    break;
                default: return 'Invalid type of image target'
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
                        <input type="file" onChange={handleFileUpload} value={fileInput} />
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                    </div>
                    <button class="uk-button uk-button-default">Submit</button>
                </div>
            </form>
            {previewedFile && (
                <img src={previewedFile} alt='preview' />
            )}
        </div>
    )
}
export default ImageUpload;