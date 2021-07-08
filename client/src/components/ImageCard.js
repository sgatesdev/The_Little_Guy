import React, {useState, useEffect} from 'react';
import {Image} from 'cloudinary-react';

export const ImageCard = () => {
const [imageId, setImageId] = useState(['']);
const loadImages = async () => {
    try {
        const response = await fetch('/api/images');
        setImageId(response.data);
    } catch (err) {
        throw err;
    };
useEffect(() => {
     loadImages();
}, [])
//only called once
}
return (
    <div>
        {imageId ? 
        <Image cloudName="drcmojwwk" publicId={imageId}/>
        : null}
    </div>
)
};
export default ImageCard;