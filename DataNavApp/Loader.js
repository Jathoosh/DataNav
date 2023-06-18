import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Loader = props => (
  <Svg
    width={118}
    height={107}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M32.333 6C17.608 6 5.667 17.819 5.667 32.4c0 11.77 4.666 39.707 50.602 67.947a5.26 5.26 0 0 0 5.462 0c45.936-28.24 50.602-56.176 50.602-67.947 0-14.581-11.941-26.4-26.666-26.4C70.94 6 59 22 59 22S47.059 6 32.333 6Z"
      stroke="#F24E1E"
      strokeWidth={10.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Loader;
