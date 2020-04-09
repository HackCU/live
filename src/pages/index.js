import React from 'react';
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
  faInfo,
  faWifi
} from '@fortawesome/free-solid-svg-icons';
import SEO from '../components/seo';
import OutsideLink from '../components/outside-link';
import { Box, Text, Flex } from 'rebass';
import Title from '../components/title';

function removeHttps(string) {
  return string.replace('https://', '');
}

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
            hackerGuide
          }
        }
      }
    }
  `);
  const { title, social } = data.site.siteMetadata;
  return (
    <>
      <Title>Welcome to {title}!</Title>
      <SEO title="Home" />
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={[1, 1, 2 / 3]} px={2}>
          <Box variant="darkCard" color="textDark" fontSize={3}>
            <Box>
              <Text fontSize={5} mb={2}>
                General Information
              </Text>
              <Text as="b">
                <FontAwesomeIcon icon={faChevronRight} /> Slack:{' '}
                <OutsideLink href={social.slack}>
                  {removeHttps(social.slack)}
                </OutsideLink>
              </Text>
              <Text mt={2}>
                Join the HackCU Slack to talk with all the hackers attending our
                event!
              </Text>
            </Box>

            <Box mt={4}>
              <Text as="b">
                <FontAwesomeIcon icon={faUpload} /> Devpost:{' '}
                <OutsideLink href={social.devpost}>
                  {removeHttps(social.devpost)}
                </OutsideLink>
              </Text>
              <Text mt={2}>
                Register for HackCU on Devpost, and submit your hack here by
                12:00 pm
                <Text as="b">
                  (submit early, you can edit your submission!)
                </Text>
              </Text>
            </Box>

            <Box mt={4}>
              <Text as="b">
                <FontAwesomeIcon icon={faInfo} /> Hacker guide:{' '}
                <OutsideLink href={social.hackerGuide}>
                  {removeHttps(social.hackerGuide)}
                </OutsideLink>
              </Text>
              <Text mt={2}>
                Check out all the information that you need in this useful guide
                we have written down for you!
              </Text>
            </Box>
          </Box>
        </Box>

        <Box width={[1, 1, 1 / 3]} mt={[2, 2, 0]} px={2}>
          <Box variant="darkCard" color="textDark" fontSize={3}>
            <Text fontSize={5}>#HackCU</Text>
            <Text mt={2}>
              Get{' '}
              <OutsideLink href="https://twitter.com/search?src=typd&q=%23lhd">
                #HackCU
              </OutsideLink>{' '}
              trending!
            </Text>
            <Text fontSize={3} fontWeight={700} mt={3}>
              <FontAwesomeIcon icon={faTwitter} />{' '}
              <OutsideLink href={social.twitter}>@HackCU</OutsideLink>
            </Text>
            <Text fontSize={3} fontWeight={700} mt={2}>
              <FontAwesomeIcon icon={faInstagram} />{' '}
              <OutsideLink href={social.instagram}>@HackCU</OutsideLink>
            </Text>
            <Text fontSize={3} fontWeight={700} mt={2}>
              <FontAwesomeIcon icon={faFacebook} />{' '}
              <OutsideLink href={social.facebook}>/HackCU</OutsideLink>
            </Text>
          </Box>

          <Box variant="darkCard" mt={2} color="textDark" fontSize={3}>
            <Text fontSize={4}>
              <FontAwesomeIcon icon={faWifi} /> <Text as="b">Network: </Text>{' '}
              UCB Guest
            </Text>
            <Text mt={2}>
              Open your browser and go to{' '}
              <OutsideLink href="https://cuwireless.int/colorado.edu">
                cuwireless.int.colorado.edu
              </OutsideLink>{' '}
              to accept the usage agreement.
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default IndexPage;
