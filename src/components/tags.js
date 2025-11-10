import React from 'react';
import { rhythm } from '../utils/typography';
import * as styles from './tags.module.css';

export const Tags = ({ tags, style }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.tagsContainer}
      style={{
        marginTop: rhythm(0.2),
        marginBottom: rhythm(0),
        ...style,
      }}
    >
      {tags.map((tag) => (
        <a key={tag} href={`/tags/${tag}`} className={styles.tag}>
          #{tag}
        </a>
      ))}
    </div>
  );
};
