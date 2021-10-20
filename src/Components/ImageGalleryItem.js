import React from 'react'

 function ImageGalleryItem({imgUrl,imgTitle}) {
    //  console.log(imgUrl)
    return (
<div className="ImageGalleryItem">
  <img src={imgUrl} alt={imgTitle} className="ImageGalleryItem-image" />
  <h2>{imgTitle}</h2>
</div>
)
}
export default ImageGalleryItem