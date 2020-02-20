import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import { css, Global } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import OutsideLink from './outside-link';

// Fixes large icons on load
// https://github.com/FortAwesome/react-fontawesome/issues/284
// config.autoAddCss = false;

const Layout = ({ title = null, children }) => {
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
    <div
      css={css`
        ${dom.css()}
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;
      `}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        css={css`
          width: 100%;
          margin: 0 auto;
          height: 100%;
          padding: 0px 1.0875rem 1.45rem;
          padding-top: 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        {/* Global css */}
        <Global
          styles={theme => css`
            a {
              color: ${theme.colors.secondary};
              font-decoration: none;
              transition: 0.5s ease;
              transition-property: all;
              transition-duration: 0.5s;
              transition-timing-function: ease;
              transition-delay: 0s;
              &:hover {
                color: #b3e2ff;
              }
              &:visited {
                color: ${theme.colors.secondary};
              }
            }

            h1,
            h2,
            h3,
            h4,
            h5 {
              font-family: Biko, sans-serif;
              // font-weight: 900;
            }
          `}
        />

        <main
          className="container"
          css={css`
            font-size: 17.5px;
            margin-top: 50px;
            padding-bottom: 40px;

            p {
              // font-weight: 300;
              line-height: 2em;
              margin-bottom: 20px;
            }

            b {
              font-weight: bold;
            }

            li {
              font-weight: 400;
            }
          `}
        >
          {title !== null && (
            <h1
              css={theme =>
                css`
                  color: ${theme.colors.primary};
                  text-align: center;
                  margin-top: 2rem;
                  margin-bottom: 1.75rem;
                  font-weight: 400;
                `
              }
            >
              {title}
            </h1>
          )}
          {children}
        </main>

        {/* Spacing element */}
        <div
          css={css`
            flex-grow: 1;
          `}
        />

        <footer
          css={css`
            margin-left: auto;
            margin-right: auto;
          `}
        >
          <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()},
          Made with ❤️ by
          {` `}
          <OutsideLink href="https://team.hackcu.org/">HackCU</OutsideLink>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
