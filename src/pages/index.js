import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import {
  faChevronRight,
  faUpload,
  faQuestion,
  faInfo,
  faWifi
} from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card } from 'react-materialize';

import Layout from '../components/layout';
import SEO from '../components/seo';
import OutsideLink from '../components/outside-link';

function removeHttps(string) {
  return string.replace('https://', '');
}

const InfoItem = ({ children }) => (
  <>
    <p>{children}</p>
    <br />
  </>
);

const SocialItem = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.14rem 0 0.912rem 0;
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          social {
            twitter
            instagram
            facebook
            slack
            devpost
            mentor
            hackerGuide
          }
        }
      }
    }
  `);
  const { title, social } = data.site.siteMetadata;
  return (
    <Layout title={`Welcome to ${title}!`}>
      <SEO title="Home" />
      <Row>
        <Col s={12} l={8}>
          <Card
            css={theme => css`
              background-color: ${theme.colors.primary};
              color: ${theme.colors.text};
            `}
            title="General Information"
          >
            <InfoItem>
              <b>
                <FontAwesomeIcon icon={faChevronRight} /> Slack:{' '}
                <OutsideLink href={social.slack}>
                  {removeHttps(social.slack)}
                </OutsideLink>
              </b>
              <br />
              Join the HackCU Slack to talk with all the hackers attending our
              event!
            </InfoItem>
            <InfoItem>
              <b>
                <FontAwesomeIcon icon={faUpload} /> Devpost:{' '}
                <OutsideLink href={social.devpost}>
                  {removeHttps(social.devpost)}
                </OutsideLink>
              </b>
              <br />
              Register for HackCU on Devpost, and submit your hack here by 12:00
              pm <b>(submit early, you can edit your submission!)</b>
            </InfoItem>
            <InfoItem>
              <b>
                <FontAwesomeIcon icon={faInfo} /> Hacker guide:{' '}
                <OutsideLink href={social.hackerGuide}>
                  {removeHttps(social.hackerGuide)}
                </OutsideLink>
              </b>
              <br />
              Check out all the information that you need in this useful guide
              we have written down for you!
            </InfoItem>
          </Card>
        </Col>
        <Col s={12} l={4}>
          <Card
            title="#HackCU"
            css={theme => css`
              background-color: ${theme.colors.primary};
              color: ${theme.colors.text};
            `}
          >
            <p>
              Get{' '}
              <OutsideLink href="https://twitter.com/search?src=typd&q=%23lhd">
                #HackCU
              </OutsideLink>{' '}
              trending!
            </p>
            <SocialItem>
              <FontAwesomeIcon icon={faTwitter} />{' '}
              <OutsideLink href={social.twitter}>@HackCU</OutsideLink>
            </SocialItem>
            <SocialItem>
              <FontAwesomeIcon icon={faInstagram} />{' '}
              <OutsideLink href={social.instagram}>@HackCU</OutsideLink>
            </SocialItem>
            <SocialItem>
              <FontAwesomeIcon icon={faFacebook} />{' '}
              <OutsideLink href={social.facebook}>/HackCU</OutsideLink>
            </SocialItem>
          </Card>
        </Col>
        <Col s={12} l={4}>
          <Card
            title={
              <>
                <FontAwesomeIcon icon={faWifi} /> <b>Network: </b> UCB Guest
              </>
            }
            css={theme => css`
              background-color: ${theme.colors.primary};
              color: ${theme.colors.text};
            `}
          >
            <p>
              Open your browser and go to{' '}
              <OutsideLink href="https://cuwireless.int/colorado.edu">
                cuwireless.int.colorado.edu
              </OutsideLink>{' '}
              to accept the usage agreement.
            </p>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default IndexPage;
