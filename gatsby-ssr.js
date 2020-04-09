/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
export { wrapRootElement } from './src/utils/theme';
// prevent layout unmount for dark mode switch to not constant change state
// in other words it fixes transitions
// read more here https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export { wrapPageElement } from './src/components/layout';
