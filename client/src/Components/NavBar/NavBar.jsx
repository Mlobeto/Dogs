
import Logo from "../../assets/favicon-32x32.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
 
      <div className={styles.nav}>
      <div className={styles.TitleAndSearchBar}>
        <div className={styles.logoAndTitle}>
          <Link to="/home">
            <img
              id="logoHenry"
              src={Logo}
              alt="a happy dog icon"
              className={styles.logo}
            />
          </Link>
          <div>
            <h1>Dogs</h1>
            
          </div>
        </div>
        <div>
          <SearchBar />
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