import React, {useEffect, useState} from 'react';
import Axios from 'axios';
// import "../assets/login.css";
import "../assets/registration.css";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import imageL from "../assets/images/BBJ_reg.png";





function Login(){

 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");
 const [role, setRole] = useState("");

 const [loginStatus, setLoginStatus] = useState("");

Axios.defaults.withCredentials = true;
 const login = () => {
    Axios.post("https://us-central1-csc-648-group5-babyblackjack.cloudfunctions.net/api/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.message) {
         setLoginStatus( response.data.message);
      } else {
         setLoginStatus (response.data[0].message);
      }
   });
 };

 useEffect(() => { Axios.get("https://us-central1-csc-648-group5-babyblackjack.cloudfunctions.net/api/login").then((response) => {

    if (response.data.loggedIn == true)
        {
            setRole(response.data.user[0].role);
            }
      });
    }, []);

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
                  <input type="text" name="email"

                                onChange = { (e) => {
                                   setEmail (e.target.value);
                                }}
                                />

                  {/* <div id="email_error">Please enter your Email or Username</div> */}
                  <div className="font font1">Password</div>
                  <input type="password" name="password"

                                onChange = { (e) => {
                                   setPassword (e.target.value);
                                }}
                                />

                  {/* <div id="password_error">Please enter your Password</div> */}
                  <button type="submit" onClick={login}>Login</button>
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