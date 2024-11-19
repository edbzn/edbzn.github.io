import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { rhythm } from '../utils/typography';

const style = {
  title: {
    fontSize: '1.1rem',
    marginBottom: rhythm(0.6),
    fontWeight: 'light',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
  },
  nav: {
    margin: rhythm(2.4) + ' auto',
    fontFamily: 'Montserrat, sans-serif',
  },
};

export const PostNav = ({ previous, next }) => (
  <nav role="navigation" style={style.nav} className='post-nav'>
    <div style={style.title}>More from Edouard Bozon</div>
    <ul style={style.ul}>
      {previous && (
        <li>
          <Link
            to={previous.fields.slug}
            style={{ color: 'inherit', fontWeight: 'bold' }}
            rel="prev"
          >
            {previous.frontmatter.title}
          </Link>
        </li>
      )}
      {next && (
        <li>
          <Link
            to={next.fields.slug}
            style={{ color: 'inherit', fontWeight: 'bold' }}
            rel="next"
          >
            {next.frontmatter.title}
          </Link>
        </li>
      )}
    </ul>
  </nav>
);

PostNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
};
