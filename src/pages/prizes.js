import React from 'react';
import Layout from '../components/layout';
// import prizes from "../../content/data/prizes.yaml"
import { Collection, CollectionItem } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import SEO from '../components/seo';
import OutsideLink from '../components/outside-link';

// - title: "Coolest Hack with Twilio"
//   type: sponsor
//   description: "This prize goes out to the coolest hack with Twilio. Be it by combining various of our own APIs, use our APIs in ways we haven't seen before or by solving a great problem with them. Your creativity sets all the limits in this one. Documentation: [twilio.com/docs](https://twilio.com/docs). Check out Twilio Quest to learn Twilio APIs in a fun and interactive way (plus there will be credit and t-shirt awards): [twilio.com/quest](https://twilio.com/quest)"
//   award: Sonos Play:1 / teammate
//   url: https://twilio.com/try-twilio

const Prize = ({ title, description, award, url }) => (
  <CollectionItem>
    <h5
      css={css`
        font-weight: 500;
      `}
    >
      {title}
    </h5>
    <br />
    {/* __html is need for some reason by react:
      https://reactjs.org/docs/dom-elements.html
    */}
    <div
      css={css`
        line-height: 2em;
      `}
      dangerouslySetInnerHTML={{ __html: description }}
    />
    <br />
    <div>
      <b>Award: </b>
      <div
        css={css`
          line-height: 2em;
        `}
        dangerouslySetInnerHTML={{ __html: award }}
      />
    </div>
    {url !== null && (
      <OutsideLink href={url}>
        <FontAwesomeIcon icon={faPlus} /> More Info
      </OutsideLink>
    )}
  </CollectionItem>
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
            url
          }
        }
      }
    }
  `);
  const prizes = data.allPrizesYaml.edges.map(val => val.node);
  return (
    <Layout title="Prizes">
      <SEO title="Prizes" />
      <Collection>
        {prizes
          .filter(prize => prize.type === 'hackathon')
          .map(prize => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Collection>

      <h1>Sponsored Prizes</h1>
      <Collection>
        {prizes
          .filter(prize => prize.type === 'sponsor')
          .map(prize => (
            <Prize key={prize.id} {...prize} />
          ))}
      </Collection>
    </Layout>
  );
};
