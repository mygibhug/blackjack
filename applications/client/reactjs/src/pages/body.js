import React from "react";
// import Card from 'react-playing-card';
import image from '../assets/projectimage.jpeg';
import {BrowserRouter as Router, Link} from 'react-router-dom';


class Body extends React.Component {
    render(){
        return(
          <div className = 'main'>
            <div className ='overlay'></div>
            <img src = {image} height = "100%" width ="100%" />
           
            
        

            <div className ="font-effect-neon">

                <h1>Welcome to BabyBlackjack</h1> 
               
            </div>
            <Link to="/main">
          <button className="playbutton">Play as guest</button>
        </Link>
             
           

        </div>

            


   


        );
    }
}
export default Body;

//Ready to push