import React from "react";
import videobg from "../assets/gamevideo.mov";
import "../App.css";
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Main(){
    return(
        <>
        <div className = "main">
            <div className ='overlay'></div>

            <video className ="video" src={videobg} autoPlay loop/>

            
            <Link to="/game">
            <button className ="playbutton">Play Now</button>
            </Link>

            <div className = "instruction">
            <details>
              <summary>Instruction</summary>
                <li>step1:Do this do that </li>
                <li>step2:Do this do that </li>
                <li>step3:Do this do that </li>
               
            </details>
            </div>




        </div>






        </>
    )
}
export default Main;