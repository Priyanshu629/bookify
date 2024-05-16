import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";


const Header = () => {
  const firebase = useFirebase();
  

  return (
    <Navbar expand="lg" className="bg-body-tertiary " data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {firebase.isLoggedin===false ? (
              <>
                <Nav.Link as={Link} to={"/"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/signup"}>
                  Sign-Up
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to={"/home"}>
                Home
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
