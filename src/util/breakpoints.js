export const breakpointsConfig = {
  small: 800,
  regular: 1000
};

export const breakpoints = Object.entries(breakpointsConfig).reduce(
  (obj, [name, size]) => ({
    ...obj,
    [name]: `@media (min-width: ${size}px)`
  }),
  {}
);
