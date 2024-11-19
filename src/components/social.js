import React from 'react';

import github from '../../static/icons/github.svg';
import linkedin from '../../static/icons/linkedin.svg';
import twitter from '../../static/icons/twitter.svg';
import instagram from '../../static/icons/instagram.svg';
import youtube from '../../static/icons/youtube.svg';

export const Social = ({ social }) => {
  return (
    <div className="socials">
      <a
        style={{ boxShadow: 'none' }}
        href={social.twitter}
        title="@edbzn on Twitter"
      >
        <img src={twitter} alt="Twitter profile" />
      </a>
      <a
        style={{ boxShadow: 'none' }}
        href={social.github}
        title="@edbzn on GitHub"
      >
        <img src={github} alt="Github profile" />
      </a>
      <a
        style={{ boxShadow: 'none' }}
        href={social.instagram}
        title="@edbzn on Instagram"
      >
        <img src={instagram} alt="Instagram profile" />
      </a>
      <a
        style={{ boxShadow: 'none' }}
        href={social.youtube}
        title="@edbzn on YouTube"
      >
        <img src={youtube} alt="YouTube profile" />
      </a>
      <a
        style={{ boxShadow: 'none' }}
        href={social.linkedin}
        title="@edouardbozon on LinkedIn"
      >
        <img src={linkedin} alt="Linkedin profile" />
      </a>
    </div>
  );
};
