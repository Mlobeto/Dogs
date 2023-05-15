import Logo from "../../assets/logo.png";
//import L11 from "../../assets/L11.jpeg";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({pagination}) {

  return (
    <div className={styles.nav}>
      <div className={styles.TitleAndSearchBar}>
        <div className={styles.logoAndTitle}>
          <Link to="/home">
            <img
              className={styles.logo}
              src={Logo}
              alt="a dog icon"
              onClick={() => window.location.reload()}
            />
          </Link>
          <div>
            <h1>Dogs</h1>
          </div>
        </div>
        <div>
          <SearchBar
          pagination={pagination} />
        </div>
        <div className={styles.filterSection}>
          <div className={styles.addDog}>
            <Link to="/newDog/">
              <button className={styles.button_add_dog}>CREATE DOG</button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}

//import { Link } from "react-router-dom";
// import style from "./NavBar.module.css"

// const NavBAr = ()=> {

//     return(
//         <div className={style.mainContainer}>
//             <Link to= "/">HOME</Link>
//             <Link to= "/create">FORM</Link>
//         </div>

//     )
// }

// export default NavBAr
