import { graphql } from 'gatsby';
import React from 'react';
import Giscus from '@giscus/react';
import { MDXProvider } from '@mdx-js/react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { Note } from '../components/note';
import { PostNav } from '../components/post-nav';
import { Seo } from '../components/seo';
import { rhythm } from '../utils/typography';

const shortcodes = { Note };

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const { social, author } = this.props.data.site.siteMetadata;
    const { previous, next } = this.props.pageContext;
    const { location, children } = this.props;
    return (
      <Layout location={location} social={social} author={author}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description ?? post.excerpt}
          article={true}
          canonical={post.frontmatter.canonical}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                display: `block`,
                marginTop: rhythm(0.2),
                marginBottom: rhythm(2),
                fontWeight: 'lighter',
              }}
            >
              {post.frontmatter.draft ? (
                <strong>
                  <span role="img" aria-label="emoji" alt="wip">
                    🚧
                  </span>{' '}
                  Draft
                </strong>
              ) : (
                post.frontmatter.date
              )}
            </p>
          </header>
          <MDXProvider components={shortcodes}>
            <section style={{ marginBottom: rhythm(2) }}>{children}</section>
          </MDXProvider>
          <Giscus
            id="comments"
            repo="edbzn/edbzn.github.io"
            repoId="MDEwOlJlcG9zaXRvcnk5OTQ4MDU0Mw=="
            category="Comments"
            categoryId="DIC_kwDOBe3z384CkeQh"
            mapping="pathname"
            strict="0"
            reactionsEnabled="0"
            emitMetadata="0"
            inputPosition="bottom"
            theme="light"
            loading="lazy"
            lang="en"
            crossorigin="anonymous"
            async
          />
          <PostNav previous={previous} next={next} />
          <footer>
            <Bio />
          </footer>
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        social {
          twitter
          linkedin
          github
          bluesky
        }
      }
    }
    mdx(published: { eq: true }, fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        description
        title
        date(formatString: "MMMM DD, YYYY")
        canonical
        draft
      }
    }
  }
`;
