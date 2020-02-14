import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Navbar } from 'react-materialize';
import { css } from '@emotion/core';
import Countdown from './countdown';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`
    }}
  >
    <Navbar
      alignLinks="left"
      brand={
        <div
          css={theme => css`
            background-color: ${theme.colors.secondary};
            padding-left: 40px !important;
            padding-right: 40px !important;
            padding-bottom: 10px !important;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
          `}
        >
          <Countdown />
        </div>
      }
      centerLogo
      fixed
      css={theme => css`
        color: ${theme.colors.text};
        background-color: ${theme.colors.primary};
        a:visited {
          color: ${theme.colors.text};
        }
      `}
    >
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/rules">Rules</Link>
      <Link to="/prizes">Prizes</Link>
      <Link to="/schedule">Schedule</Link>
    </Navbar>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
