import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Button from './Button'
import styles from './Dashboard.module.css'
import macrosSampleImage from '../assets/macros-sample-image.png'

export default function Dashboard() {
  const heroStyle = {
    width: `calc(100% - var(--hero-gap))`, // Adjust the width to accommodate the gaps
    margin: `30px calc(var(--hero-gap) / 2)`, // Create a gap on either side
    flex: `var(--hero-flex)`,
  };

return (
  <div className={styles.mainContainer}>
    <Header />
    <Button text={"Go Premium"} />
    <Hero className={styles.heroSection} 
    style={heroStyle}
    Text1={"Graphic A"}
    Text2={"Graphic B"}
    Text3={"Graphic C"}
    Text4={"Graphic D"}
    Image1={macrosSampleImage}
    Image2={macrosSampleImage}
    Image3={macrosSampleImage}
    Image4={macrosSampleImage}  />
    <Footer className={styles.footer} />
  </div>
)
}
