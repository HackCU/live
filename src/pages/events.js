import React from 'react';
import Layout from '../components/layout';
import { Link as ReactLink, useStaticQuery, graphql } from 'gatsby';
import { Text, Heading, Flex, Box, Link } from 'rebass';
import Title from '../components/title';

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
    <>
      <Title>Events</Title>
      <Text>
        Check out the{' '}
        <Link as={ReactLink} to="/schedule">
          schedule
        </Link>{' '}
        to know when all these workshops and more are happening!
      </Text>
      <Heading as="h3" my={3} variant="subtitle">
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
            <Heading variant="cardTitle">{item.title}</Heading>
            <Text>by {item.author}</Text>
            <Text fontSize={2}>{item.description}</Text>
          </Box>
        ))}
      </Flex>

      <Heading as="h3" my={3} variant="subtitle">
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
            <Heading variant="cardTitle">{item.title}</Heading>
            <Text>{item.description}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};
