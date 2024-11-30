const siteUrl = `https://edbzn.github.io`;

module.exports = {
  siteMetadata: {
    siteUrl,
    url: siteUrl,
    titleTemplate: '%s · edbzn.github.io',
    author: `Edouard Bozon`,
    description:
      'Edouard Bozon - Freelance software engineer specializing in Angular, Node.js, and modern web technologies. Explore insights on tech, development tips, and my freelance services to help bring your projects to life.',
    authorDescription:
      "I'm Edouard Bozon, a freelance software engineer with expertise in web technologies. My focus areas include Angular, Node.js, and more. I'm also an open-source contributor and a climber in my spare time.",
    twitterUsername: '@edbzn',
    social: {
      twitter: `https://twitter.com/edbzn`,
      github: `https://github.com/edbzn`,
      linkedin: `https://www.linkedin.com/in/edouardbozon`,
      bluesky: `https://bsky.app/profile/edbzn.bsky.social`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: true,
              providers: {
                include: ['Twitter', 'YouTube'],
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 698, // 698 is the width of the container
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-plugin-meta-redirect`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `{
  allMarkdownRemark(
    filter: {published: {eq: true}}
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          title
          date
          canonical
        }
      }
    }
  }
}`,
            output: '/rss.xml',
            title: "edbzn.github.io's RSS Feed",
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `edbzn.github.io`,
        short_name: `edbzn.github.io`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `static/icons/icon-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://edbzn.github.io',
        sitemap: 'https://edbzn.github.io/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-RP7PEWVFB4'],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#000000`,
        showSpinner: true,
      },
    },
  ],
};
