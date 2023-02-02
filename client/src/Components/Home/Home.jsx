import React, { useState, useEffect  } from "react";
import Pagination from "../Pagination/Pagination";
import { useSelector,useDispatch  } from "react-redux";
import { getDogs, orderByName } from "../../redux/actions";




import DogArea from "../DogArea/DogArea";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs())
  
  }, [dispatch])
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

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
