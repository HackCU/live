import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import { Box } from 'rebass';
import Title from '../components/title';

export default () => {
  // get the rule.md from data based on the frontmatter property `path: "rules"`
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { path: { eq: "rules" } }) {
        html
      }
    }
  `);
  return (
    <>
      <Title>Rules</Title>
      <SEO title="Rules" />
      <Box
        // TODO: Integrate with theme ui some how?
        css={(theme) => css`
          a {
            text-decoration: none;
            color: ${theme.colors.primary};
          }
          li {
            list-style-type: square !important;
            margin-left: 1em;
            // font-weight: 300;
            line-height: 2em;
          }
        `}
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </>
  );
};
