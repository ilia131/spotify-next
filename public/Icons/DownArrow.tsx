import React from 'react';
import { SVGProps } from 'react';

const DownArrow = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none" {...props}>
    <path d="M0.471834 2.8498C-0.159809 2.19592 -0.156684 1.13699 0.477694 0.486337C1.11246 -0.164721 2.13942 -0.1615 2.77106 0.492377L10 7.96244L17.2289 0.492377C17.8606 -0.1615 18.8875 -0.164721 19.5223 0.486337C20.1567 1.13699 20.1598 2.19592 19.5282 2.8498L11.1434 11.5137C10.509 12.1647 9.48164 12.1615 8.85039 11.5076L0.471834 2.8498Z" fill="white" fillOpacity="0.62"/>
    </svg>
  )
);

DownArrow.displayName = 'DownArrow';

export default DownArrow;
