import { graphql, Link } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { Projects } from '../components/oss-projects';
import { PostPreview } from '../components/post-preview';
import { Resume } from '../components/resume';
import { rhythm } from '../utils/typography';

class AboutMe extends React.Component {
  render() {
    const { data } = this.props;
    const { siteMetadata } = data.site;
    const { author, ossProjects, experiences, github } = siteMetadata;
    const blogPosts = data.allMdx.nodes;

    return (
      <Layout location={this.props.location} author={author} github={github}>
        <Seo title="About me" />
        <Bio />

        <section style={{ marginTop: rhythm(2) }}>
          <div
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: '"Public Sans", sans-serif',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                fontWeight: '100',
              }}
            >
              Resume
            </span>
          </div>
          <Resume experiences={experiences} />
        </section>

        <section style={{ marginTop: rhythm(2) }}>
          <div
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: '"Public Sans", sans-serif',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                fontWeight: '100',
              }}
            >
              Latest posts
            </span>{' '}
            ·{' '}
            <Link to="blog" style={{ boxShadow: 'none' }}>
              All Posts
            </Link>
          </div>
          {blogPosts.map((node) => (
            <div
              key={node.frontmatter.title}
              style={{ marginTop: rhythm(1.4) }}
            >
              <PostPreview node={node} />
            </div>
          ))}
        </section>

        <section className="projects" style={{ marginTop: rhythm(2) }}>
          <div
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: '"Public Sans", sans-serif',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                fontWeight: '100',
              }}
            >
              Open source projects
            </span>{' '}
            ·{' '}
            <a href={github.sponsorUrl} style={{ boxShadow: 'none' }}>
              Sponsor Me
            </a>
          </div>

          <Projects ossProjects={ossProjects} />
        </section>
      </Layout>
    );
  }
}

export default AboutMe;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        author
        github {
          sponsorUrl
          repositoryUrl
        }
        ossProjects {
          name
          description
          img
          url
        }
        experiences {
          company
          position
          period
        }
      }
    }
    allMdx(
      limit: 5
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
