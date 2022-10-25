import React from 'react';
// import "../assets/registration.css";

function Registration(){
    return(
        <div>
            <div className="container">
  
    <h1 id="loginHeader">Registration</h1>
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
        <input
          type="button"
          defaultValue="Register"
          id="loginSubmit"
          onclick="validate()"
        />
      </div>
    </form>
    <div className="new">
      <h3>Already have an Account?</h3>
    </div>
    <div className="createAccount">
      <h2>
        {" "}
        <a id="createAccountLink" href="login.html">
          <p>Login</p>
        </a>
      </h2>
    </div>

  </div>
        </div>
    )
}

export default Registration;