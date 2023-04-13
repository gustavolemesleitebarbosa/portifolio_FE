
import React, { useState } from 'react';
import { client } from '../../client';

import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { images } from '../../constants';
import { AppWrap, MotionWrapper } from '../../wrapper';
import './Footer.scss';



import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const formValidation = async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Please fill the name in the form before submitting'),
        email: Yup.string()
          .email("Please enter a valid email in the form before submitting")
          .required('Please fill the email in the form before submitting'),
        message: Yup.string()
          .required('Please fill the message field in the form before submitting')
      })
      const data = { name, email, message }
      await schema.validate(data)
    }
    catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw Error(error.message)
      }
    }
  }



  const handleSubmit = () => {

    setLoading(true)
    const contact = {
      _type: 'contact',
      name,
      email,
      message
    }
    client.create(contact).then(() => formValidation()).then(async () => {
      setLoading(false)
      setIsFormSubmitted(true)
    }).catch(err => {
      toast(err.message ? err.message : "An error occurred please try again later")
      setLoading(false)
    });
  }

  return (
    <>
      {!isFormSubmitted ? (
        <>
          <Toaster />
          <h2 className="head-text">Take a coffee & chat with me</h2>

          <div className="app__footer-cards">
            <div className="app__footer-card ">
              <img src={images.email} alt="email" />
              <a href="mailto:gustavolemesleite@gmail.com" className="p-text">gustavolemesleite@gmail.com</a>
            </div>
            <div className="app__footer-card">
              <img src={images.mobile} alt="phone" />
              <a href="tel:+1 (123) 456-7890" className="p-text">+55 (19) 983390686</a>
            </div>
          </div>
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
            </div>
            <div className="app__flex">
              <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className={loading ? 'button-opacity' : null} onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
          </div>
        </>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
}


export default AppWrap(
  MotionWrapper(Footer, 'app__works'),
  'contact',
  'app__whitebg',
);