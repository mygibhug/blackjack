import React from 'react';
import Home from "./pages/home";
import Navbar from './components/Navbar';
import Main from './components/main'
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from './components/Footer';

import "./App.css";
// import { Route,Routes } from 'react-router-dom';


// const App = () =>{
//   return(
//     <div>
//       <Routes>
//         <Route exact path ='/' element={<Home />} />
//       </Routes>
//     </div>
//   )
// }

function App() {
  
  return( 
   <div className = "App">
    
  <div><Navbar/></div>
  {/* <div>  <Main /> </div> */}
  <div><Home /></div>
  <div><Footer /></div>
  </div>


 
  );
}



export default App;

