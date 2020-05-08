// Used for custom site theme
import './src/global.css';
export { wrapRootElement } from './src/utils/theme';
// prevent layout unmount for dark mode switch to not constant change state
// in other words it fixes transitions
// read more here https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export { wrapPageElement } from './src/components/layout';
