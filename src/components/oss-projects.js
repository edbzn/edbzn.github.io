import React from 'react';
import { rhythm } from '../utils/typography';

export const Projects = ({ ossProjects }) => (
  <ul
    style={{
      margin: 0,
      listStyle: 'none',
      gap: rhythm(0.4),
    }}
  >
    {ossProjects.map((project) => (
      <li className="box" key={project.name}>
        <a
          href={project.url}
          style={{
            color: 'initial',
            fontWeight: 400,
            fontFamily: '"Public Sans", sans-serif',
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
          {project.name}
        </a>
        <p style={{ marginTop: rhythm(0.1) }}>{project.description}</p>
      </li>
    ))}
  </ul>
);
