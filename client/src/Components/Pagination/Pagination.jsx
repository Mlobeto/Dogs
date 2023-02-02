import styles from "./Pagination.module.css";

export default function Pagination({
  dogsPerPage,
  allDogs,
  pagination,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    //me devuellve el entero igual o mayor
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.crumbs}>
        <button
          className={styles.arrow}
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>

        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={styles.number} key={number}>
              <div
                className={
                  currentPage === number ? styles.crumb__active : styles.crumb
                }
                onClick={() => pagination(number)}
              >
                {number}
              </div>
            </li>
          ))}
        <button
          className={styles.arrow}
          onClick={() => pagination(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          &rarr;
        </button>
      </ul>
    </nav>
  );
}
