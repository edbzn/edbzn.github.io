import React from 'react';

import github from '../../static/icons/github.svg';
import linkedin from '../../static/icons/linkedin.svg';
import twitter from '../../static/icons/twitter.svg';

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
        href={social.linkedin}
        title="@edouardbozon on LinkedIn"
      >
        <img src={linkedin} alt="Linkedin profile" />
      </a>
    </div>
  );
};
