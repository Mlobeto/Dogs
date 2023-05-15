import React from "react";
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
      
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome</h1>
                <Link to='/home'>
                    <button className={styles.bubblyButton}>Want to see more?</button>
                </Link>
                <video autoPlay muted loop className={styles.video_bg}>
                    <source src="../movie.mp4" type="video/mp4"/>
                </video>
            </div>
       
    )
}

