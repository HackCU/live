import React from 'react';
import { Link } from 'rebass';

export default ({ children, target = '_blank', ...props }) => {
  // Improve link security
  if (target === '_blank') {
    return (
      <Link
        {...props}
        color="primary"
        target={target}
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link {...props} color="primary" target={target}>
      {children}
    </Link>
  );
};
