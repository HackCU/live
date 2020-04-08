import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core';
import OutsideLink from './outside-link';
import { Heading, Box, Flex } from 'rebass';

// Fixes large icons on load
// https://github.com/FortAwesome/react-fontawesome/issues/284
// config.autoAddCss = false;

const Layout = ({ title = null, children, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Flex
      minHeight="100vh"
      flexDirection="column"
      css={css`
        ${dom.css()}
      `}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <Flex
        {...props}
        as="main"
        mt={4}
        mx="auto"
        px={3}
        pb={4}
        flexDirection="column"
        width={1}
        maxWidth={1000}
      >
        {title !== null && (
          <Heading
            as="h1"
            fontSize={[6, 7]}
            color="secondary"
            textAlign="center"
            mt={3}
            mb={4}
            fontWeight={400}
          >
            {title}
          </Heading>
        )}
        {children}
      </Flex>

      {/* Spacing element */}
      <Box my="auto" />

      <Box as="footer" py={3} mx="auto">
        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}, Made
        with ❤️ by
        {` `}
        <OutsideLink href="https://team.hackcu.org/">HackCU</OutsideLink>
      </Box>
    </Flex>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
