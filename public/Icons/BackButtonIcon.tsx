import React from 'react';
import { SVGProps } from 'react';

const BackButtonIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="23" height="35" viewBox="0 0 23 35" fill="none" {...props}>
              <path d="M22.9999 32.0942V2.90271C22.9986 2.22592 22.7631 1.54708 22.2846 0.99689C21.2311 -0.211611 19.3959 -0.339578 18.1871 0.712899L0.99523 15.6844C0.879545 15.7877 0.767967 15.9013 0.665974 16.0245C-0.355335 17.259 -0.182838 19.0888 1.05204 20.1098L18.1302 34.2362C18.6477 34.7104 19.3364 34.9998 20.0935 34.9998C21.698 34.9998 22.9999 33.6983 22.9999 32.0942Z" fill="white" fill-opacity="0.8"/>
            </svg>   
  )
);

BackButtonIcon.displayName = 'BackButtonIcon';

export default BackButtonIcon;
