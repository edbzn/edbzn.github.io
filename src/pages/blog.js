import { graphql } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { PostPreview } from '../components/post-preview';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { siteMetadata } = data.site;
    const { social, author } = siteMetadata;
    const blogPosts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} social={social} author={author}>
        <Seo title="All posts" />
        <Bio />
        <section role="main" style={{ marginTop: rhythm(2) }}>
          {blogPosts.map(({ node }) => (
            <div
              key={node.frontmatter.title}
              style={{ marginTop: rhythm(1.4) }}
            >
              <PostPreview node={node} />
            </div>
          ))}
        </section>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
          instagram
          linkedin
          youtube
        }
      }
    }
    allMarkdownRemark(
      filter: { published: { eq: true } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            draft
          }
        }
      }
    }
  }
`;
