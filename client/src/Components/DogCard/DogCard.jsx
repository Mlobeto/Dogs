import React from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";
import {deleteElementById, getDogs} from "../../redux/actions"
import {useDispatch} from "react-redux";







export default function DogCard({
  id,
  name,
  image,
  temperament,
  temperaments,
  weight_min,
  weight_max,
}){
  const dispatch = useDispatch()
  const handleDelete = async (event)=>{ 
  
    await dispatch(deleteElementById(event.target.value))
   
     alert("The Dog was deleted successfully")
     await dispatch(getDogs())
     
   }


  if (!temperaments) {

    return (
      <div className={styles.dogsArea}>
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
      </div>
    );
  } else {
    return (
      <div className={styles.dogsArea}>
      <div className={styles.dogCard}>
        <Link to={"/dogs/" + id}>
          <div className={styles.titleArea}>
            <h4 className={styles.dogName}>{name}</h4> 
          <button value={id} onClick={handleDelete}>X</button>
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
     </div>
    );
  }
}
