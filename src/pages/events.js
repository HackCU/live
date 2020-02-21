import React from 'react';
import Layout from '../components/layout';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CollectionItem, Collection } from 'react-materialize';
import { css } from '@emotion/core';
import OutsideLink from '../components/outside-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  const workshops = data.allWorkshopsYaml.edges.map(val => val.node);
  const sideEvents = data.allSideEventsYaml.edges.map(val => val.node);
  return (
    <Layout title="Events">
      <p>
        Check out the <Link to="/schedule">schedule</Link> to know when all
        these workshops and more are happening!
      </p>
      <h4>Workshops</h4>
      <Collection>
        {workshops.map(item => (
          <CollectionItem key={item.id}>
            <h5
              css={css`
                font-weight: 500;
              `}
            >
              {item.title}
            </h5>
            <small>by {item.author}</small>
            <p>{item.description}</p>
          </CollectionItem>
        ))}
      </Collection>

      <h4>Side Events</h4>
      <Collection>
        {sideEvents.map(item => (
          <CollectionItem key={item.id}>
            <h5
              css={css`
                font-weight: 500;
              `}
            >
              {item.title}
            </h5>
            <p>{item.description}</p>
            
          </CollectionItem>
        ))}
      </Collection>
    </Layout>
  );
};
