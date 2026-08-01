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
  const { theme } = useTheme();

  const openExternalPage = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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

  const getExperienceSortedValue = (range) => {
    if (!range) return 0;
  
    // Supports both "-" and "–"
    const parts = range.split(/–|-/).map((p) => p.trim());
  
    if (parts.length < 2) return 0;
  
    const end = parts[1];
  
    if (end.toLowerCase() === "ongoing") {
      return Number.MAX_SAFE_INTEGER;
    }
  
    const date = new Date(`1 ${end}`);
  
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };
  
  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileInView={{ opacity: [0, 1] }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img
                  src={urlFor(skill.icon)}
                  alt={skill.name}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {[...experiences]
            .sort(
              (a, b) =>
                getExperienceSortedValue(b.year) -
                getExperienceSortedValue(a.year)
            )
            .map((experience, index) => (
              <motion.a
                key={experience.year}
                className="app__skills-exp-item"
                onClick={() => openExternalPage(experience.works[0].link)}
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
                        arrowColor={
                          theme === "dark" ? "#186559" : "#313bac"
                        }
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
                      >
                        <div style={{ paddingLeft: index === 0 ? "12px" : 0 }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 6,
                            }}
                          >
                            <h4 className="bold-text">{work.name}</h4>
                            <HiExternalLink
                              size={22}
                              style={{ color: "#6b7688" }}
                            />
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
  MotionWrapper(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
