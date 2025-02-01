import { graphql, Link } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { PostPreview } from '../components/post-preview';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const {
      data,
      pageContext: { tag },
    } = this.props;
    const { siteMetadata } = data.site;
    const { author, github } = siteMetadata;

    let blogPosts = data.allMdx.nodes;
    if (tag) {
      blogPosts = blogPosts.filter((post) =>
        (post.frontmatter.tags ?? []).includes(tag)
      );
    }

    return (
      <Layout location={this.props.location} author={author} github={github}>
        <Seo title={tag ? `${tag} posts` : 'All posts'} />
        <Bio />
        <section role="main" style={{ marginTop: rhythm(2) }}>
          <span
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: '"Public Sans", sans-serif',
              textTransform: 'uppercase',
              boxShadow: 'none',
              fontWeight: '100',
            }}
            to="/blog"
          >
            {tag ? `#${tag}` : 'All posts'}
          </span>{' '}
          ·{' '}
          <Link
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: '"Public Sans", sans-serif',
              textTransform: 'uppercase',
              boxShadow: 'none',
            }}
            to="/"
          >
            About me
          </Link>
          {tag && (
            <>
              {' '}
              ·{' '}
              <Link
                style={{
                  marginBottom: rhythm(1.4),
                  fontFamily: '"Public Sans", sans-serif',
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                }}
                to="/blog"
              >
                All posts
              </Link>
            </>
          )}
          {blogPosts.map((node) => (
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
  {
    site {
      siteMetadata {
        author
        github {
          repositoryUrl
          sponsorUrl
        }
      }
    }
    allMdx(
      filter: { published: { eq: true } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          description
          date(formatString: "MMMM DD, YYYY")
          title
          draft
          tags
        }
      }
    }
  }
`;
