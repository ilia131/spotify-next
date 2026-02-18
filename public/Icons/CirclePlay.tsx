import React from 'react'
import { SVGProps } from 'react';


const CirclePlay = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg 
    ref={ref}
    xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 42" fill="none" {...props}>
     <rect width="44" height="42" rx="21" fill="white" fillOpacity="0.81"/>
        <path d="M17.5695 29.5707C16.9007 29.952 16.07 29.4664 16.0742 28.6966L16.1536 13.9744C16.1577 13.2046 16.9937 12.728 17.6582 13.1165L30.3683 20.5463C31.0329 20.9348 31.0277 21.8971 30.359 22.2784L17.5695 29.5707Z" fill="black" fillOpacity="0.98"/>
     </svg>
  )
);

CirclePlay.displayName = 'CirclePlay';


export default CirclePlay 


