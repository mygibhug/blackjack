// import React from 'react';
// import Home from "./pages/home";
// import Navbar from './components/Navbar';
// import Main from './components/main';
// // import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Footer from './components/Footer';

// import "./App.css";
// // import { Route,Routes } from 'react-router-dom';


// // const App = () =>{
// //   return(
// //     <div>
// //       <Routes>
// //         <Route exact path ='/' element={<Home />} />
// //       </Routes>
// //     </div>
// //   )
// // }

// function App() {
  
//   return( 
//    <div className = "App">
    
//   <div><Navbar/></div>
//   {/* <div>  <Main /> </div> */}
//   <div><Home /></div>
//   <div><Footer /></div>
//   </div>


 
//   );
// }



// export default App;

import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as  Router, Route,Routes, Link, Redirect } from "react-router-dom";

//importing Pages
import Home from "./pages/home";
import Aboutus from "./pages/aboutus";
import Registration from "./pages/registration";
import Login from "./pages/login";
import AboutPritam from "./pages/aboutPritam";






class App extends Component{
  render(){
    return (
    <Router>
     <Routes>

      <Route exact path="/" element ={<Home/>} />
      <Route exact path="/aboutus" element={<Aboutus/>} />
      <Route exact path="/registration" element={<Registration/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/aboutPritam" element={<AboutPritam/>} />
     
      

      </Routes>
     
      </Router>

    );
  }
}

export default App;