import DogCard from "../DogCard/DogCard";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./DogArea.module.css";
import {
  getDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  filterCreated,
  getBreeds,
  getDogsByBreed,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  orderByWeight,
} from "../../redux/actions";

export default function DogArea({currentDogs, pagination, orden, orderByName }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
    dispatch(getBreeds());
  }, [dispatch]);

  const allDogs = useSelector((state) => state.dogs);
  const breeds = useSelector((state) => state.breeds);
  const temperaments = useSelector((state) => state.temperaments);

  const minWeights = allDogs
    .map((el) => el.weight_min)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMinWeights = [...new Set(minWeights)];

  const maxWeights = allDogs
    .map((el) => el.weight_max)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMaxWeights = [...new Set(maxWeights)];

  

  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    orden(`Ordenado ${e.target.value}`);
    pagination(1);
    
  }
  function handleClickOrderWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    pagination(1);
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    pagination(1);
  }
  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    pagination(1);
  }
  function handleFilteredByBreed(e) {
    e.preventDefault();
    dispatch(getDogsByBreed(e.target.value));
    pagination(1);
  }
  function handleFilteredMAXWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMAXWeight(e.target.value));
    pagination(1);
  }
  function handleFilteredMINWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMINWeight(e.target.value));
    pagination(1);
  }

  return (
    <div className={styles.dogsArea}>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>Order by name</h5>
        <select
          onChange={(e) => {
            handleClickOrder(e);
          }}
        >
          <option value="all" hidden>
            Order
          </option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>Order by Weight</h5>
        <select
          onChange={(e) => {
            handleClickOrderWeight(e);
          }}
        >
          <option defaultValue value="all" hidden>
            Order
          </option>
          <option value="asc">Heavier</option>
          <option value="desc">Lighter</option>
        </select>
      </div>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>Filter by </h5>
        <select
          onChange={(e) => {
            handleFilterCreated(e);
          }}
        >
          <option defaultValue value="all">
            All Sources
          </option>
          <option value="created">DB </option>
          <option value="inDB">API </option>
        </select>
      </div>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>by Temperament</h5>
        <select onChange={(e) => handleFilteredByTemp(e)}>
          <option value="all">All Temperaments</option>
          {temperaments?.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>by breed</h5>
        <select onChange={(e) => handleFilteredByBreed(e)}>
          <option value="all">All Breeds</option>
          {breeds.map((breed) => {
            return breed ? (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ) : (
              ""
            );
          })}
        </select>
      </div>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>by max weight</h5>
        <select onChange={(e) => handleFilteredMAXWeight(e)}>
          <option value="all">All Weights</option>
          {allDogsMaxWeights.map((maxWeight) => {
            return maxWeight ? (
              <option value={maxWeight} key={maxWeight}>
                {maxWeight} kg
              </option>
            ) : (
              ""
            );
          })}
        </select>
      </div>
      <div className={styles.filterSection}>
        <h5 className={styles.filterHeader}>by min weight</h5>
        <select onChange={(e) => handleFilteredMINWeight(e)}>
          <option value="all">All Weights</option>
          {allDogsMinWeights.map((minWeight) => {
            return minWeight ? (
              <option value={minWeight} key={minWeight}>
                {minWeight} kg
              </option>
            ) : (
              ""
            );
          })}
        </select>
      </div>
      <div>
      {currentDogs.map((el) => {
        return (
          <DogCard
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            temperament={el.temperament}
            temperaments={el.temperaments}
            weight_min={el.weight_min}
            weight_max={el.weight_max}
          />
        );
      })}
      </div>
    </div>
  );
}
