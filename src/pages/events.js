import React from 'react';
import Layout from '../components/layout';
import { Link as ReactLink, useStaticQuery, graphql } from 'gatsby';
import { Text, Heading, Flex, Box, Link } from 'rebass';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allWorkshopsYaml {
        edges {
          node {
            id
            title
            description
            author
          }
        }
      }
      allSideEventsYaml {
        edges {
          node {
            id
            title
            description
            url
          }
        }
      }
    }
  `);
  const workshops = data.allWorkshopsYaml.edges.map((val) => val.node);
  const sideEvents = data.allSideEventsYaml.edges.map((val) => val.node);
  return (
    <Layout title="Events">
      <Text>
        Check out the{' '}
        <Link as={ReactLink} to="/schedule">
          schedule
        </Link>{' '}
        to know when all these workshops and more are happening!
      </Text>
      <Heading as="h4" my={3}>
        Workshops
      </Heading>
      <Flex flexDirection="column">
        {workshops.map((item) => (
          <Box
            key={item.id}
            p={3}
            variant="outline"
            sx={{
              listStyle: 'none'
            }}
          >
            <Text as="h5" fontWeight={500}>
              {item.title}
            </Text>
            <Text>by {item.author}</Text>
            <Text fontSize={2}>{item.description}</Text>
          </Box>
        ))}
      </Flex>

      <Heading as="h4" my={3}>
        Side Events
      </Heading>
      <Flex flexDirection="column">
        {sideEvents.map((item) => (
          <Box
            key={item.id}
            p={3}
            variant="outline"
            sx={{
              listStyle: 'none'
            }}
          >
            <Text as="h5" fontWeight={500}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </Box>
        ))}
      </Flex>
    </Layout>
  );
};
