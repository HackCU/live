module.exports = {
  siteMetadata: {
    title: `HackCU VI`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@HackCU`,
    social: {
      twitter: 'https://twitter.com/HackCU',
      instagram: 'https://www.instagram.com/hackcu',
      facebook: 'https://www.facebook.com/HackCU',
      slack: 'https://slack.hackcu.org',
      devpost: 'https://hackcuv.devpost.com',
      mentor: 'https://mentors.hackcu.org',
      hackerGuide: 'https://pages.hackcu.org/guide/hacker'
    },
    startingTime: '2019-12-16T08:00:00.000Z',
    endingTime: '2019-12-16T23:00:00.000Z'
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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        // icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
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
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
