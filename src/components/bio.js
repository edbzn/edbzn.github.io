import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

import { rhythm } from '../utils/typography';
import { Social } from './social';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/images/me.jpg/" }) {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          authorDescription
          social {
            twitter
            github
            linkedin
            instagram
            mail
          }
        }
      }
    }
  `);

  const { author, social, authorDescription } = data.site.siteMetadata;

  return (
    <div
      className="bio box"
      style={{
        display: `flex`,
      }}
    >
      <div className="avatar" style={{ paddingRight: rhythm(0.7) }}>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginTop: rhythm(0.4),
            marginBottom: 0,
            width: 84,
            height: 84,
            borderRadius: `50%`,
            margin: 0,
          }}
        />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 'lighter' }}>
          {authorDescription}
        </p>
        <div style={{ marginTop: rhythm(0.4) }}>
          <Social social={social} />
        </div>
      </div>
    </div>
  );
};

export default Bio;
