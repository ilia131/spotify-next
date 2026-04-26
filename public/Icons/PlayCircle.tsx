import React from 'react';
import { SVGProps } from 'react';

const PlayCircle = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 0C48.1196 0 62 13.8804 62 31C62 48.1196 48.1196 62 31 62C13.8804 62 0 48.1196 0 31C0 13.8804 13.8804 0 31 0ZM25 18.5L44 31L25 43.5V18.5Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  )
);

PlayCircle.displayName = 'PlayCircle';

export default PlayCircle;
 