import React from "react";


function aboutPritam(){
    return(
        <div>
<h1>About Me</h1>
  <h2> Hi, my name is Pritam Gautam. I am Senior student. </h2>
  <h2> I am working as a Frontend lead in this project.</h2>
  <div className="pritamcss">
    <img src="IMG_0650.jpg" alt="Pritam" style={{ width: 250, height: 250 }} />
    <h2>Introduction</h2>
    <p></p>
  </div>
  <div className="skills column">
    <h3>My Skills</h3>
    <ul id="skill-list">
      <li>Web Development</li>
      <li>Design process</li>
      <li>Teamwork</li>
    </ul>
  </div>
  <div className="main-text">
    <h3>More About Me</h3>
    <p>
      I'm highly energetic and motivated person. I love Jamming with my friends.
      I also love playing around with the features of webpage design.
    </p>
    <p>Email me @ pgautam@sfsu.edu</p>
  </div>
  </div>

    )
}
export default aboutPritam;

