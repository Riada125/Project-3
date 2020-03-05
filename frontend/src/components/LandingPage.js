import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { Parallax } from 'react-parallax'
import Fade from 'react-reveal/Fade'
// import Navbar from './Navbar'
// import posed from 'react-pose'
// import styled from 'styled-components'
import RecipeHoveredSquare from './HoveredSquare'
import RestaurantHoveredSquare from './RestaurantHoveredSquare'

const styles = {
  fontFamily: 'monospace',
  textAlign: 'center'
}

const insideStyles = {
  background: 'white',
  padding: 20,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  fontFamily: 'monospace'
}

const image4 = 'https://tr-images.condecdn.net/image/1WxNDMm9eOR/crop/1620/f/berenjak-nov18-pr.jpg'


class LandingPage extends React.Component {
  state = { hovering: false }
	
  render() {
    return <div style={styles}>
      <Parallax
        bgImage={image4}
        strength={300}
        renderLayer={percentage => (
          <div>
            <div
              style={{
                position: 'absolute',
                background: `rgba(255, 125, 0, ${percentage * 1})`,
                left: '50%',
                top: '50%',
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                width: percentage * 700,
                height: percentage * 700
              }}
            />
          </div>
        )}>
        <div style={{ height: 900 }}>
          <div style={insideStyles}>The Kitchen</div>
        </div>
      </Parallax>
      <div style={{ height: 300 }} className="below-hero">
        <div className="section">
          <Fade right>
            <h2>Providing food for those who love to cook...</h2>
          </Fade>
          <Fade left>
            <h2>...and those who prefer to be cooked for</h2>
          </Fade>
        </div>
      </div>
      <div style={{ height: 600 }} className="second-below-hero">
        <Fade left>
          <RecipeHoveredSquare className="columns is-one-quarter-mobile"/>
        </Fade>
        <div>
          <Fade right> 
            <RestaurantHoveredSquare className="columns is-one-quarter-mobile"/>
          </Fade>
        </div>
      </div>
      <h2>{'..'}</h2>
    </div>
  }
}

export default LandingPage
