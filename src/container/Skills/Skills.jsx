import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { HiExternalLink } from 'react-icons/hi';

import ReactTooltip from 'react-tooltip';
import { client, urlFor } from '../../client';
import { useTheme } from '../../hooks/useTheme';
import { AppWrap, MotionWrapper } from '../../wrapper';
import './Skills.scss';


const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const { theme } = useTheme()
  const openExternalPage = (url) => {
    window.open(url, "_blank", "_noreferrer");
  }

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              whileHover={{ scale: [1, 1.2] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img style={{ objectFit: 'contain' }} src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.sort((exp1, exp2) => parseInt(exp2.year.slice(-2)) - parseInt(exp1.year.slice(-2))).map((experience) => (
            <motion.a
              className="app__skills-exp-item"
              key={experience.year}
              onClick={() => {
                openExternalPage(experience.works[0].link)
              }}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <div key={work.company}>
                    <ReactTooltip
                      id={work.company}
                      effect="solid"
                      arrowColor={theme === 'dark' ? "#186559" : "#313bac"}
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.company}
                      key={work.company}
                    >
                      <div>
                        <div style={{ display: 'flex', gap:6, flexDirection: 'row' }}>
                          <h4 className="bold-text">{work.name}</h4>
                          <HiExternalLink size={22} style={{ color: '#6b7688' }} />
                        </div>
                        <p className="p-text">{work.company}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrapper(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);