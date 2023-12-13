import React from 'react'
import heroImage from '../images/heroImage.png'

const Landing = () => {
  return (
    <div className='hero-section'>
        <div className='hero-content'>
          <h1>Discover Perspectives: Insights, Stories, and Ideas</h1>
          <p className='hero-para'>Embark on a Journey Through Captivating Narratives, Thought-Provoking Insights, and Inspiring Ideas. 
            Unleash the Power of Words to Explore, Learn, and Connect – Where Every Blog is a Portal to a World 
            of Endless Possibilities</p>
          <p className='hero-ending'>Sign Up Now!</p>
        </div>
        <div className='hero-image'>
          <img src={heroImage} alt='hero-image' />
        </div>
    </div>
  )
}

export default Landing