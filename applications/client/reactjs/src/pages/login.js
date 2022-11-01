import React from 'react';
// import "../assets/login.css";
import "../assets/registration.css";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import imageL from "../assets/images/BBJ_reg.png";



function Login(){
    return(
        <div>
          <div className = 'main'>
            <div className ='overlay'></div>
              <img src = {imageL} height = "100%" width ="100%" />
                  <div className="BodyL">
                    <div className="containerL">
                        <h1 className="label">Login</h1>
                    <form className="Login" method="Login" name="form">
                    <div className="font">Email or Username</div>
                  <input type="text" name="email" />
                  {/* <div id="email_error">Please enter your Email or Username</div> */}
                  <div className="font font1">Password</div>
                  <input type="password" name="password" />
                  {/* <div id="password_error">Please enter your Password</div> */}
                  <button type="submit">Login</button>
                  <div className="createAccount">
                  <Link to="/registration">
                    <button>Signup here</button>
                    </Link>
                  </div>
                </form>
              </div>
           </div>
        </div>
      </div>
      
    );
}

    
    export default Login;