import React from 'react';
import Layout from '../components/layout';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';

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
    <Layout title="Rules">
      <SEO title="Rules" />
      <div
        css={css`
          li {
            list-style-type: square !important;
            margin-left: 1em;
            font-weight: 300;
            line-height: 2em;
          }
        `}
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Layout>
  );
};
