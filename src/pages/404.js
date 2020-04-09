import React from 'react';
import SEO from '../components/seo';
import { Heading, Text } from 'rebass';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Heading>NOT FOUND</Heading>
    <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </>
);

export default NotFoundPage;
