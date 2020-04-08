import React from 'react';
import Layout from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import { Heading, Box, Text, Flex } from 'rebass';
import OutsideLink from '../components/outside-link';

const Prize = ({ title, description, award, url }) => (
  <Box
    p={3}
    variant="outline"
    sx={{
      listStyle: 'none'
    }}
  >
    <Heading as="h5" fontWeight={500}>
      {title}
    </Heading>
    <Text dangerouslySetInnerHTML={{ __html: description }} />
    <Box>
      <Text as="b">Award:</Text>
      <Text dangerouslySetInnerHTML={{ __html: award }} />
    </Box>
    {!!url && (
      <OutsideLink href={url}>
        <FontAwesomeIcon icon={faPlus} /> More Info
      </OutsideLink>
    )}
  </Box>
);

export default () => {
  const data = useStaticQuery(graphql`
    {
      allPrizesYaml {
        edges {
          node {
            id
            title
            type
            description
            award
          }
        }
      }
    }
  `);
  const prizes = data.allPrizesYaml.edges.map((val) => val.node);
  return (
    <Layout title="Prizes">
      <SEO title="Prizes" />
      <Flex flexDirection="column">
        {prizes
          .filter((prize) => prize.type === 'hackathon')
          .map((prize) => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Flex>

      {/* todo: large font size */}
      <Heading as="h1" my={4}>
        Sponsored Prizes
      </Heading>

      <Flex flexDirection="column">
        {prizes
          .filter((prize) => prize.type === 'sponsor')
          .map((prize) => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Flex>
    </Layout>
  );
};
