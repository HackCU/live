import React from 'react';

export default ({ children, target = '_blank', ...props }) => {
  // Improve link security
  if (target === '_blank') {
    return (
      <a {...props} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a {...props} target={target}>
      {children}
    </a>
  );
};
