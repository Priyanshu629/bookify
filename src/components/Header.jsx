import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";


const Header = () => {
  const firebase = useFirebase();
  

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
        <img src="https://cdn-icons-png.flaticon.com/512/8832/8832880.png" alt="" className="logo"/>
         <span className="text-white text-weight-bold">Bookify</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            {firebase.isLoggedin===true ? (
              <>
              <Nav.Link as={Link} to={"/home"} className="text-white ">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/Profile"} className="text-white  ">
                Profile
              </Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link as={Link} to={"/about"} className="text-white  rounded mx-1 my-2 px-2">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to={"/"} className="text-white rounded mx-1 my-2  px-2 ">
                Login
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
