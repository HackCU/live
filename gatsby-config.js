module.exports = {
  siteMetadata: {
    title: `HackCU VI`,
    description: `Join us for HackCU on February 22, 2020 at the University of Colorado Boulder.`,
    author: `@HackCU`,
    social: {
      twitter: 'https://twitter.com/HackCU',
      instagram: 'https://www.instagram.com/hackcu',
      facebook: 'https://www.facebook.com/HackCU',
      slack: 'https://hackcu.slack.com',
      devpost: 'https://hackcu-vi.devpost.com/',
      hackerGuide: 'https://pages.hackcu.org/guide/hacker'
    },
    startingTime: '2020-02-22T19:00:00.000Z',
    endingTime: '2020-02-23T19:00:00.000Z'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/data`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#4285F4`,
        theme_color: `#4285F4`,
        display: `minimal-ui`,
        icon: `src/img/hackcu2020logo.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-transformer-yaml-full`,
      options: {
        plugins: [
          `gatsby-yaml-full-markdown` // Enable !markdown tags
        ]
      }
    },
    {
      // Used for modal windows
      resolve: `gatsby-plugin-portal`,
      options: {
        key: 'portal',
        id: 'portal'
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-emotion`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
