import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import { Heading, Box, Text, Flex } from 'rebass';
import OutsideLink from '../components/outside-link';
import Title from '../components/title';

const Prize = ({ title, description, award, url }) => (
  <Box
    p={3}
    variant="outline"
    sx={{
      listStyle: 'none'
    }}
  >
    <Heading variant="cardTitle">{title}</Heading>
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
    <>
      <Title>Prizes</Title>
      <SEO title="Prizes" />

      <Heading as="h3" mt={1} mb={3} variant="subtitle">
        General Prizes
      </Heading>

      <Flex flexDirection="column">
        {prizes
          .filter((prize) => prize.type === 'hackathon')
          .map((prize) => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Flex>

      <Heading as="h3" my={4} variant="subtitle">
        Sponsored Prizes
      </Heading>

      <Flex flexDirection="column">
        {prizes
          .filter((prize) => prize.type === 'sponsor')
          .map((prize) => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Flex>
    </>
  );
};
