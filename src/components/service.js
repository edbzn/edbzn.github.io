import React from 'react';
import nxBadge from '../../static/images/nx-badge.png';
import { rhythm } from '../utils/typography';

export const Service = () => {
  return (
    <section style={styles.section} className="box">
      <img style={styles.img} src={nxBadge} alt="Nx Badge" />
      <h2 style={styles.heading}>Looking for a senior developer?</h2>
      <p style={styles.services}>
        I provide <span style={styles.underline}>web development</span> and{' '}
        <span style={styles.underline}>platform engineering</span> services{' '}
        <br />
        to help you build scalable applications.
      </p>
      <a
        href="mailto:bozonedouard@gmail.com"
        style={styles.contactLink}
        title="Mail to Edouard Bozon"
      >
        Let's discuss
      </a>
    </section>
  );
};

const styles = {
  underline: {
    textDecoration: 'underline',
  },
  section: {
    margin: rhythm(2.4) + ' auto',
    backgroundColor: 'rgb(10 25 47)',
    color: '#ccd6f6',
    textAlign: 'center',
    fontFamily: '"Public Sans", sans-serif',
    padding: '20px',
  },
  heading: {
    fontSize: '1.5rem',
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: 'bold',
    color: 'rgb(232 236 248)',
    margin: '10px 0',
  },
  contactLink: {
    display: 'inline-block',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '4px',
    padding: '10px 20px',
    textDecoration: 'none',
    boxShadow: 'none',
    fontSize: '1.2rem',
    fontWeight: 400,
    marginBottom: '18px',
  },
  services: {
    marginBottom: '22px',
  },
  img: {
    width: '100px',
    margin: '0 auto',
    filter: 'drop-shadow(rgb(255, 255, 255, 0.1) 0px 0px 8px)',
  },
};
