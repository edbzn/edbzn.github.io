import React from 'react';
import nxBadge from '../../static/images/nx-badge.png';

export const Service = () => {
  return (
    <section style={styles.section} className="box">
      <img style={styles.img} src={nxBadge} alt="Nx Badge" />
      <h2 style={styles.heading}>Looking for an experienced developer?</h2>
      <p style={styles.services}>
        Mobile & Web Development, Consulting, Auditing.
      </p>
      <a
        href="mailto:bozonedouard@gmail.com"
        style={styles.contactLink}
        title="Mail to Edouard Bozon"
      >
        📧 Contact Me
      </a>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'rgb(10 25 47)',
    color: '#ccd6f6',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    padding: '20px',
  },
  heading: {
    fontSize: '1.5rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    color: 'rgb(232 236 248)',
    margin: '10px 0',
  },
  contactLink: {
    display: 'inline-block',
    color: '#64ffda',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bolder',
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
