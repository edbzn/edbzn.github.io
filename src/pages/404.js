import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/seo';

class NotFoundPage extends React.Component {
  render() {
    const { author, github } = this.props.data.site.siteMetadata;

    return (
      <Layout location={this.props.location} author={author} github={github}>
        <Seo title="Page Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        github {
          repositoryUrl
          sponsorUrl
        }
        title
      }
    }
  }
`;
