import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import registration from "../pages/registration";
// import { GiAce } from "react-icons/gi";


function Navbar1() {
  
        return(
 <div>
  <Navbar bg="dark" variant="dark" > 
      
      <Container>
        <Navbar.Brand className = "babyblackjack" href="#home" >Babyblackjack  </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link className = "login" href="/login">login</Nav.Link>
           
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Instruction</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/registration">signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>




 </div>
        );
    }


export default Navbar1;







