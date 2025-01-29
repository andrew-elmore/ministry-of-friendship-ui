import React from 'react';
const ImageComponent = ({image, ...props}) => (
  <div 
      {...props}
      style={{
          width: 20,
          height: 20,
          backgroundImage: image,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 20,
          ...props.style,
      }} 
  />
)

export default ImageComponent;