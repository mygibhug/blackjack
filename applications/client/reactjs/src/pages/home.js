import React from 'react';
import Body from "./body";
import Navbar from '../components/Footer';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from '../components/Navbar';




import "../App.css";

function Home() {
  
  return( 
   <div className = "Home">
     <div><Footer /></div>
    <div><Body /></div>
  
   <div><Navbar/></div>
   

  </div>


 
  );
}

export default Home;



