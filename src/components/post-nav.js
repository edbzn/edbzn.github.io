import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const style = {
  width: '48%',
  borderRadius: '4px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const PostNav = ({ previous, next }) => (
  <nav role="navigation">
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        alignItems: 'stretch',
        listStyle: `none`,
        padding: 0,
        marginTop: '2rem',
      }}
    >
      {previous && (
        <li className="box" style={style}>
          <Link to={previous.fields.slug} style={{ color: 'inherit', fontWeight: 'bold'}} rel="prev">
            {previous.frontmatter.title}
          </Link>
        </li>
      )}
      {next && (
        <li className="box" style={style}>
          <Link to={next.fields.slug} style={{ color: 'inherit', fontWeight: 'bold'}} rel="next">
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
