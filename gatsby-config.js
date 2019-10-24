const firebaseConfig = require("./config/firebase-config.json")

module.exports = {
  siteMetadata: {
    title: `The Land and the Refinery`,
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "React CMS starter",
        short_name: "React CMS starter",
        start_url: "/",
        background_color: "#000",
        theme_color: "#FCB239", // yellow
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: "gatsby-source-firebase",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);
              node.order = parseInt(node.order);
              node.footnotes = JSON.stringify(node.footnotes)
              node.definitions = JSON.stringify(node.definitions)

              return node
            },
          },
          {
            type: "Topics",
            path: "topics"
          },
          {
            type: "Categories",
            path: "categories"
          },
          {
            type: "Categories",
            path: "categories"
          },
          {
            type: "Meta",
            path: "meta"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-150807887-1",
      },
    },
  ]
};
