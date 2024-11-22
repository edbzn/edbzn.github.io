import { graphql, Link } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { PostPreview } from '../components/post-preview';
import { rhythm } from '../utils/typography';

class AboutMe extends React.Component {
  render() {
    const { data } = this.props;
    const { siteMetadata } = data.site;
    const { social, author } = siteMetadata;
    const blogPosts = data.allMarkdownRemark.edges;
    const ossProjects = [
      {
        name: ' rx-angular/rx-angular',
        description: 'Reactive Extensions for Angular.',
        img: 'https://avatars.githubusercontent.com/u/70377545?s=200&v=4',
        url: 'https://github.com/rx-angular/rx-angular',
      },
      {
        name: 'nxext/nx-extensions',
        description:
          'Nx Extensions for Stencil, Svelte, SolidJS, Preact, Ionic, and Capacitor.',
        url: 'https://github.com/nxext/nx-extensions',
        img: 'https://avatars.githubusercontent.com/u/67255711?s=200&v=4',
      },
      {
        name: 'jscutlery/semver',
        description:
          'Nx plugin to automate semantic versioning and CHANGELOG generation.',
        url: 'https://github.com/jscutlery/semver',
        img: 'https://avatars.githubusercontent.com/u/55789006?s=200&v=4',
      },
      {
        name: 'jscutlery/devkit',
        description: 'Cutleries to help you cook better apps.',
        url: 'https://github.com/jscutlery/semver',
        img: 'https://avatars.githubusercontent.com/u/55789006?s=200&v=4',
      },
      {
        name: 'jscutlery/nx-completion',
        description: 'Nx workspace completion plugin for Zsh.',
        url: 'https://github.com/jscutlery/nx-completion',
        img: 'https://avatars.githubusercontent.com/u/55789006?s=200&v=4',
      },
    ];

    return (
      <Layout location={this.props.location} social={social} author={author}>
        <Seo title="About me" />
        <Bio />

        <section style={{ marginTop: rhythm(2) }}>
          <div
            style={{
              marginBottom: rhythm(1.4),
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            <span
              style={{
                fontWeight: '200',
                textTransform: 'uppercase',
              }}
            >
              Last posts
            </span>{' '}
            · <Link to="blog">All Posts</Link>
          </div>
          {blogPosts.map(({ node }) => (
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
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            <span
              style={{
                fontWeight: '200',
                textTransform: 'uppercase',
              }}
            >
              Open source projects
            </span>{' '}
            · <a href={'https://github.com/sponsors/edbzn'}>Sponsor Me</a>
          </div>

          <ul
            style={{
              listStyle: 'none',
              gap: rhythm(0.4),
            }}
          >
            {ossProjects.map((project) => (
              <li className="box" key={project.name}>
                <a
                  href={project.url}
                  style={{
                    color: 'initial',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  <img
                    style={{
                      height: '34px',
                      marginBottom: rhythm(0.3),
                      display: 'block',
                    }}
                    alt="Project logo"
                    src={project.img}
                  />
                  {project.name}
                </a>
                <p style={{ marginTop: rhythm(0.1) }}>{project.description}</p>
              </li>
            ))}
          </ul>
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
        social {
          twitter
          github
          linkedin
        }
      }
    }
    allMarkdownRemark(
      limit: 5
      filter: { published: { eq: true } }
      sort: { frontmatter: { date: DESC } }
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
