import React, {useState} from 'react';

 const ImageUpload = () => {
    const [fileInput, setFileInput] = useState('');
    const [previewedFile, setPreviewedFile] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        previewUploadedFile(file);
    }
    const previewUploadedFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            setPreviewedFile(reader.result);

        }
    }
    const handleSubmitFile = (event) => {
        event.preventDefault();
        if(!previewedFile) return;
        uploadImage(previewedFile);
    }
    const uploadImage  = async (base64EncodedImage) => {
        try {
            await fetch('api/uploadImage', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage}),
                headers: { 'Content-Type': 'application/json'}
            })
        } catch (err) {
            throw err;
        }
    };
    
 return (
     <div className="uk-card uk-card-default uk-width-1-2@m">
     <form onSubmit={handleSubmitFile}>
        <div class="uk-margin" uk-margin>
            <div uk-form-custom="target: true">
                <input type="file" onChange={handleFileUpload} value={fileInput}/>
                <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled/>
            </div>
            <button class="uk-button uk-button-default">Submit</button>
        </div>
     </form>
     {previewedFile && (
         <img src={previewedFile}/>
     )}
     </div>
 )
}
export default ImageUpload;