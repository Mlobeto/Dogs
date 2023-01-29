import React from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";
export default function DogCard({
  id,
  name,
  image,
  temperament,
  temperaments,
  weight_min,
  weight_max,
}) {
  if (!temperaments) {
    return (
      <div className={styles.dogCard}>
        <Link to={"/dogs/" + id}>
          <div className={styles.titleArea}>
            <h4 className={styles.dogName}>{name}</h4>
          </div>
          <div className={styles.infoArea}>
            <div className={styles.tempArea}>
              {temperament ? (
                <h5 className={styles.dogTemp}>{temperament}</h5>
              ) : (
                <br />
              )}
            </div>
            <div className={styles.weightArea}>
              {weight_max ? (
                <h5 className={styles.weightArea}>
                  Weight Min/Max =    {weight_min}  -{weight_max}
                </h5>
              ) : (
                <br />
              )}
            </div>
            <div className={styles.imageArea}>
              <img
                className={styles.dogImage}
                src={image}
                alt={{ temperament }}
                height="120px"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.dogCard}>
        <Link to={"/dogs/" + id}>
          <div className={styles.titleArea}>
            <h4 className={styles.dogName}>{name}</h4>
          </div>
          <div className={styles.infoArea}>
            
            <div className={styles.tempArea}>
              {temperaments ? (
                <h5 className={styles.dogTemp}>
                  {temperaments.map((temp) => `${temp.name} `).join(", ")}
                </h5>
              ) : (
                <br />
              )}
            </div> 
            <div className={styles.weightArea}>
              {weight_max ? (
                <h5 className={styles.weightArea}>
                  Weight Min/Max =    {weight_min}  -{weight_max}
                </h5>
              ) : (
                <br />
              )}
            </div>
            <div className={styles.imageArea}>
              <img
                className={styles.dogImage}
                src={image}
                alt={`A dog`}
                height="140px"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
