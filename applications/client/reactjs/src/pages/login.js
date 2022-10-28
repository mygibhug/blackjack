import React from 'react';
// import "../assets/login.css";




function Login(){
    return(
        <div>
             <div className="container">
    <h1 className="label">Login</h1>
    <form className="Login" method="post" name="form">
      {" "}
      {/*onsubmit="return validated()" */}
      <div className="font">Email or Username</div>
      <input type="text" name="email" />
      {/* <div id="email_error">Please enter your Email or Username</div> */}
      <div className="font font1">Password</div>
      <input type="password" name="password" />
      {/* <div id="password_error">Please enter your Password</div> */}
      <button type="submit">Login</button>
      <div className="createAccount">
        <a id="createAccountLink" href="registration.html">
          <h2>Create an account</h2>
        </a>
      </div>
    </form>
  </div>
        </div>
    );
}

    
    export default Login;