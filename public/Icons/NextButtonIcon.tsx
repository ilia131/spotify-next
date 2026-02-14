import React from 'react';
import { SVGProps } from 'react';

const NextButtonIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="23" height="35" viewBox="0 0 23 35" fill="none" {...props}>
    <path d="M0 32.0942V2.90271C0.00136905 2.22592 0.236845 1.54708 0.715328 0.99689C1.76881 -0.211611 3.60402 -0.339578 4.81289 0.712899L22.0047 15.6844C22.1204 15.7877 22.232 15.9013 22.334 16.0245C23.3553 17.259 23.1828 19.0888 21.9479 20.1098L4.8697 34.2362C4.3522 34.7104 3.66357 34.9998 2.90649 34.9998C1.30196 34.9998 0 33.6983 0 32.0942Z" fill="white" fill-opacity="0.8"/>
    </svg>
  )
);

NextButtonIcon.displayName = 'NextButtonIcon';

export default NextButtonIcon;