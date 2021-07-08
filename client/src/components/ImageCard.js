import React, {useState, useEffect} from 'react';
import {Image} from 'cloudinary-react';

export const ImageCard = () => {
const [imageId, setImageId] = useState(['']);

//only called once

return (
    <div>
        {imageId ? 
        <Image cloudName="drcmojwwk" publicId={imageId}/>
        : null}
    </div>
)
};
export default ImageCard;