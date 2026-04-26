import React from 'react';
import { SVGProps } from 'react';

const ThreeCirlceFlex = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  ref={ref} xmlns="http://www.w3.org/2000/svg" 
     width="19" 
     height="3" 
     viewBox="0 0 19 3" 
     fill="none" 
    {...props}
    >
    <circle cx="1.5" cy="1.5" r="1.5" fill="white"/>
    <circle cx="9.5" cy="1.5" r="1.5" fill="white"/>
    <circle cx="17.5" cy="1.5" r="1.5" fill="white"/>
     </svg>
  )
);

ThreeCirlceFlex.displayName = 'ThreeCirlceFlex';

export default ThreeCirlceFlex;
