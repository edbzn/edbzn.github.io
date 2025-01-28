import React from 'react';
import { Link } from 'gatsby';
import { rhythm } from '../utils/typography';

export const PostPreview = ({ node }) => {
  return (
    <article key={node.fields.slug}>
      <header>
        <h3
          style={{
            marginTop: 0,
            marginBottom: 0,
            fontFamily: '"Public Sans", sans-serif',
          }}
        >
          <Link style={{ color: 'initial' }} to={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
        </h3>
      </header>
      <section
        style={{
          marginTop: rhythm(1 / 4),
          marginBottom: 0,
        }}
      >
        <p
          style={{ marginBottom: 0 }}
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description ?? node.excerpt,
          }}
        />
      </section>
      <footer
        style={{
          fontSize: '14px',
          fontWeight: '100',
        }}
      >
        <div
          style={{
            marginTop: rhythm(1 / 4),
            fontStyle: 'italic',
          }}
        >
          {node.frontmatter.tags &&
            node.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                style={{
                  boxShadow: 'none',
                  color: 'hsla(0,0%,0%,0.9)',
                  fontWeight: '400',
                }}
              >
                {' '}
                #{tag}
              </Link>
            ))}
        </div>
        <div style={{ fontSize: '14px' }}>
          {node.frontmatter.draft ? (
            <span>
              <span role="img" aria-label="emoji" alt="wip">
                🚧
              </span>{' '}
              Draft
            </span>
          ) : (
            node.frontmatter.date
          )}
        </div>
      </footer>
    </article>
  );
};
