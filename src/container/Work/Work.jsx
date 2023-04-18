import MuxVideo from '@mux/mux-video-react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { client, urlFor } from '../../client'
import PlaceholderImage from '../../components/PlaceholderImage/PlaceholderImage'
import { AppWrap, MotionWrapper } from '../../wrapper'
import './Work.scss'

const Work = () => {

  const handleWorkFilter = (item) => {
    setActiveFilter(item)
    setAnimateCard([{ y: 100, opacity: 0 }])
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }])
      if (item == 'all') {
        setFilterWorks(works)
      }
      else {
        setFilterWorks(works.filter(work => work.tags.includes(item)))
      }
    }, 500)
  }


  const [activeFilter, setActiveFilter] = useState('FullStack')
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
  const [works, setWorks] = useState([])
  const [filterWork, setFilterWorks] = useState([])
  useEffect(() => {
    const query = '*[_type =="works"]'
    client.fetch(query)
      .then((data) => {
        setWorks(data)
        setFilterWorks(data.filter(work => work.tags.includes('FullStack')))
      })
  }, [])


  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>
      <div className="app__work-filter">
        {['FullStack', 'NextJs', 'React', 'Mobile(RN)'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.reverse().map((work, index) => (
          <div key={work.description}>
            <div className="app__work-item app__flex" key={index}>
              <div
                className="app__work-img app__flex"
              >
                {urlFor(work.imgUrl) &&
                  <PlaceholderImage  key={work.description} src={urlFor(work.imgUrl).url()} alt={work.name} />
                }
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                  onClick={() => { window.open(work.projectLink) }}
                >
                  {work.projectLink && <a onClick={(e) => e.stopPropagation()} href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 1.25] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>}
                  {work.codeLink && <a onClick={(e) => e.stopPropagation()} href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 1.25] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>}
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>
              <div>
                <MuxVideo
                  style={{ height: '100%', maxWidth: '100%', maxHeight:180 }}
                  playbackId={work.playback}
                  controls
                  playsinline
                />
              </div>
            </div>
          </div >
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrapper(Work, 'app__works'),
  'work',
  'app__primarybg',
);