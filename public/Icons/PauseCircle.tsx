import React from 'react';
import { SVGProps } from 'react';

const PauseCircle = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31 0C48.1196 0 62 13.8804 62 31C62 48.1196 48.1196 62 31 62C13.8804 62 0 48.1196 0 31C0 13.8804 13.8804 0 31 0ZM34.3906 17.0944H42.4333V44.9056H34.3906V17.0944ZM19.5667 17.0944H27.6094V44.9056H19.5667V17.0944Z" fill="white" fill-opacity="0.8"/>
</svg>
  )
);

PauseCircle.displayName = 'PauseCircle';

export default PauseCircle;