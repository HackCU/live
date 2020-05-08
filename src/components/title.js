import React from 'react';
import { Heading } from 'rebass';

const Title = ({ children }) => (
  <Heading
    as="h1"
    fontSize={[6, 7]}
    color="secondary"
    textAlign="center"
    mt={3}
    mb={4}
    fontWeight={400}
  >
    {children}
  </Heading>
);

export default Title;
