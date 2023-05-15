import React, { useState, useEffect  } from "react";
import Pagination from "../Pagination/Pagination";
import { useSelector,useDispatch  } from "react-redux";
import { getDogs, orderByName } from "../../redux/actions";

import DogArea from "../DogArea/DogArea";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home() { 
  const dispatch = useDispatch();
  useEffect(() => { //llama a la action cuando se monta el componente
    dispatch(getDogs()) 
  }, [dispatch])
  const allDogs = useSelector((state) => state.dogs); //refleja el estado de store
  const [currentPage, setCurrentPage] = useState(1); // devuelv el estado actual y la funcion que lo actualiza
  const [dogsPerPage] = useState(18);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); 

  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const orden = (input)=>{
    setOrder(input)
  }


  return (
    <div className={styles.mainContainer}>
      <NavBar pagination={pagination} />

      <DogArea
       currentDogs={currentDogs} 
       pagination={pagination}
       currentPage={currentPage}
       orden={orden}
       orderByName={orderByName}

       />
      <div className={styles.pagination}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
