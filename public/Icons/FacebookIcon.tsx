import React from 'react';
import { SVGProps } from 'react';

const FacebookIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props} 
    >
      <path
        d="M22 10.8553C22 4.85994 17.0753 0 11 0C4.92472 0 0 4.85994 0 10.8553C0 15.9464 3.55155 20.2178 8.34271 21.3912V14.1725H6.07442V10.8553H8.34271V9.426C8.34271 5.73092 10.037 4.01839 13.7126 4.01839C14.4098 4.01839 15.6122 4.1536 16.1041 4.28838V7.29545C15.8443 7.26858 15.3935 7.25493 14.8334 7.25493C13.0297 7.25493 12.3325 7.92928 12.3325 9.68234V10.8553H15.9256L15.3084 14.1725H12.3325V21.6313C17.7794 20.9821 22 16.4054 22 10.8553Z"
        fill="#0866FF"
      />
    </svg>
  )
);

FacebookIcon.displayName = 'FacebookIcon';

export default FacebookIcon;