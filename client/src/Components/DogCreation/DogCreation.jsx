import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDogs, postDog, getTemperamentsList } from "../../redux/actions";
import styles from "../DogCreation/DogCreation.Module.css";



 function validateForm(input) {
 
  let errors = {};
  const regexName = /^[/^[a-zA-Z]+$/;
  // NAME
  
  if (!input.name) errors.name = "El nombre es requerido";
	else if (input.name.length > 18)
		errors.name = "El nombre es demasiado largo";
	else if (!regexName.test(input.name))
		errors.name = "El nombre debe ser  válido";
  
   // WEIGHTS
  if (!input.weight_min) {
    // weight min
    errors.weight_min = "Please enter valid Weight";
  } else if (!/\d{1,2}/gi.test(input.weight_min)) {
    errors.weight_min = "you must input numbers. Example: '10'";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    // weight max
    errors.weight_max = "Type a valid weight ";
  } else if (!/\d{1,2}/.test(input.weight_max)) {
    errors.weight_max = "you must input numbers. Example: '15'";
  } else {
    errors.weight_max = "";
  }
  // HEIGHTS
  if (!input.height_min) {
    // height min
    errors.height_min = "Type a valid  height ";
  } else if (!/\d{1,2}/.test(input.height_min)) {
    errors.height_min = "you must input numbers. Example: '10'";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {
    // height max
    errors.height_max = "Type a valid height ";
  } else if (!/\d{1,2}/.test(input.height_max)) {
    errors.height_max = "You must input numbers. Example: '10'";
  } else {
    errors.height_max = "";
  }
  return errors;
}


export default function DogCreation() {
  const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]); 

  const history = useHistory();
  const temperament = useSelector((state) => state.temperaments);
  const todos = useSelector(state => state.allDogs);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image:"",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.weight_min &&
      !errors.height_min &&
      !errors.weight_max &&
      !errors.height_max
    ) {
      let chocan = todos?.map(perro => perro.name === input.name)
      if (chocan){
        alert("you cant repeat a dogs name")
      } else {
        alert("Your dog was successfully created!!");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
      });
      history.push("/home");
      }
      
    } else {
      return alert("Something went wrong. Please try again.");
    }
    
  }

  

  return (
    
      <div className={styles.mainContainerCreation}>
        <div>
          <h2>Create your Dog</h2>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.Section}>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Image URL:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://myimageontheweb.com"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Heights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="50"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Weights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="15"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="32"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="12 - 15 years"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.Section}>
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
                {temperament?.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
              <div className={styles.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.temperament?.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>X</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Cancel And Back</button>
              </Link>
              <button className={styles.button} type="submit">
                Creat 
              </button>
            </div>
          </form>
        </div>
      </div>
    
  );
}