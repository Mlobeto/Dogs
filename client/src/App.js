import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import DogDetail from './Components/DogDetail/DogDetail';
import DogCreation from './Components/DogCreation/DogCreation';
//import About from './components/About/About';
import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.Mio}>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/dogs/:id' component={DogDetail}/>
        <Route path='/newDog/' component={DogCreation}/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;