import React from 'react';
import './Footer.css';
import {useNavigate} from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='footer'>
      <div><h1>RecipeRover</h1>
        <div className="small about" onClick={() => navigate('/about')}>About Us</div>
      </div>
      <div className='socials'>
        <div>Contact me</div>
        <div className="socialList">
            <ul>
                <li><a href="https://www.instagram.com/ig_manassingh" target='_blank'><img src="/instagramLogo.webp" alt="" /></a></li>
                <li><a href="https://www.facebook.com/sanam.manas.5030" target='_blank'><img src="/facebook.png" alt="" /></a></li>
                <li><a href="https://www.linkedin.com/in/manas-kumar-635ab4256/" target='_blank'><img src="/linkedin.png" alt="" /></a></li>
                <li><a href="https://x.com/themanaskumar" target='_blank'><img src="/twitter.webp" alt="" /></a></li>
            </ul>
        </div>
      </div>
      <div className="getIntouch">
        <div>Get in touch</div>
        <div className="contactOptions">
            <ul>
                <li>Phonee: <span className="about">+91 9876543210</span></li>
                <li>Mail: <span className="about">themanaskumar1@gmail.com</span></li>
            </ul>
        </div>
      </div>
      <div className="contact">
        <div>Poilicies</div>
        <div className='contactOptions'>
          <ul>
            <li className='about'>Privacy Policy</li>
            <li className='about'>Terms of use</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
