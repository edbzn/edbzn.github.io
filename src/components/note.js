import React from 'react';
import * as styles from './note.module.css';

export const Note = ({ children, type = 'note' }) => {
  return (
    <div className={styles.container + ' ' + styles[type]}>
      <div className={styles.title}>
        {type === 'note' ? 'Note 📌' : type === 'tip' ? 'Tip 💡' : 'Warning ⚠️'}
      </div>
      <div style={{ fontStyle: 'italic' }}>{children}</div>
    </div>
  );
};
