import React, { useState } from 'react';
import * as css from './resume.module.css';

export const Resume = () => {
  const [showAll, setShowAll] = useState(false);
  const experiences = [
    {
      company: 'Push-Based',
      position: 'Software Engineer & Consultant',
      period: '2021 - 2024',
    },
    {
      company: 'Notilo Plus',
      position: 'Software Engineer',
      period: '2021 - 2021',
    },
    {
      company: 'Groupama',
      position: 'Software Engineer',
      period: '2020 - 2021',
    },
    {
      company: 'Geolid',
      position: 'Software Engineer',
      period: '2019 - 2020',
    },
    {
      company: 'CoSpirit MediaTrack',
      position: 'Software Engineer',
      period: '2016 - 2019',
    },
    {
      company: 'Cybergraph',
      position: 'Designer & Web Developer',
      period: ' 2014 - 2015',
    },
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <>
      <section>
        {displayedExperiences.map((experience, index) => (
          <div key={index} className={css.container}>
            <div
              className={`${css.content} ${index === 2 && !showAll ? css.partial : ''}`}
            >
              <p>{experience.period}</p>
              <h3>{experience.company}</h3>
              <p className={css.position}>{experience.position}</p>
            </div>
          </div>
        ))}
      </section>
      <button type="button" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show Less' : 'Show More'}
      </button>
    </>
  );
};
