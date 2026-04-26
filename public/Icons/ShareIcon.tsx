

import React from 'react';
import { SVGProps } from 'react';

const ShareButton = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21 6.17383L15.0297 12.3477V9.27203C11.2543 8.47128 8.27198 9.35391 6.0069 12.2936C6.40013 6.24766 10.4344 3.33001 15.0295 3.13686L15.0297 0L21 6.17383Z" fill="white" fill-opacity="0.83"/>
      <path d="M1.18057 4.1543H7.269C6.48509 4.8471 5.78047 5.6524 5.1731 6.57124H2.36096V17.5832H16.1359V15.0161L18.4967 12.6404V18.7915C18.4967 19.4588 17.9681 19.9999 17.3163 19.9999H1.18057C0.528589 19.9999 0 19.4588 0 18.7915V5.36268C0 4.69524 0.528589 4.1543 1.18057 4.1543Z" fill="white" fill-opacity="0.83"/>
    </svg>
  )
);

ShareButton.displayName = 'Shuffle';

export default ShareButton;