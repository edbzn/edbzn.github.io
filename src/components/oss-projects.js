import React from 'react';
import { rhythm } from '../utils/typography';

export const Projects = ({ ossProjects, sponsorUrl }) => (
  <ul
    style={{
      margin: 0,
      listStyle: 'none',
      gap: rhythm(0.5),
      fontFamily: '"Public Sans", sans-serif',
    }}
  >
    {ossProjects.map((project) => (
      <li className="box" key={project.name}>
        <a
          href={project.url}
          style={{
            color: 'initial',
            fontWeight: 400,
            textDecoration: 'none',
            display: 'block',
            boxShadow: 'none',
          }}
        >
          <img
            style={{
              height: '34px',
              marginBottom: rhythm(0.3),
              display: 'block',
            }}
            alt="Project logo"
            src={project.img}
          />
          <div style={{ marginBottom: rhythm(0.2) }}>{project.name}</div>
          <p
            style={{ marginTop: rhythm(0.2), marginBottom: 0, fontWeight: 300 }}
          >
            {project.description}
          </p>
        </a>
      </li>
    ))}
    <li className="box sponsor-card" key="sponsor">
      <a
        href={sponsorUrl}
        style={{
          color: '#fff',
          textDecoration: 'none',
          display: 'block',
          boxShadow: 'none',
          fontWeight: 400,
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            marginBottom: rhythm(0.3),
            height: '34px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ⭐
        </div>
        <div style={{ marginBottom: rhythm(0.2), fontWeight: 600 }}>
          Sponsor me on GitHub
        </div>
        <p
          style={{
            marginTop: rhythm(0.2),
            color: '#fff',
            opacity: 0.95,
            marginBottom: 0,
          }}
        >
          Support my open source work and help me continue building useful tools
          for the community.
        </p>
      </a>
    </li>
  </ul>
);
