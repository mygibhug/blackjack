import React from 'react';
import "../assets/registration.css";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import imageR from "../assets/images/BBJ_log.png";


function Registration(){
    return(
      <div className = 'main'>
      <div className ='overlay'></div>
        <img src = {imageR} height = "100%" width ="100%" />
            <div className="BodyR">
              <div className="containerL">  
    <h6 id="loginHeader">Registration</h6>
    <div id="error">
     
    </div>
    <form className="RegistrationForm">
      <div>
        <input
          type="text"
          name="userName"
          id="userName"
          className="entryField"
          required=""
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          id="email"
          className="entryField"
          required=""
          placeholder="Email Address"
        />
      </div>
      <div>
        <input
          type="password"
          name="passWord"
          id="passWord"
          className="entryField"
          required=""
          placeholder="Password"
        />
      </div>
      <div>
        <input
          type="password"
          name="passWord"
          id="passWord2"
          className="entryField"
          required=""
          placeholder="Re-enter Password"
        />
      </div>
      <div>
      <button>Register</button>
      </div>
    </form>
    <div className="new">
      <h8>Already have an Account?</h8>
    </div>
    <div className="createAccount">
      <h7>
        {" "}
        <Link to="/login">
          <button>login</button>
        </Link>
      </h7>
    </div>

  </div>
        </div>
        </div>
       
    )
}

export default Registration;