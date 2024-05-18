import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handelSubmit = (e) => {

    e.preventDefault();

    if(password.length>=6){
      
      setEmail("");
      setPassword("");
      setName("")
    }
    
    firebase
      .signupUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user;
        updateProfile(user, {
          displayName: name,
        })
          .then((res) => {
            console.log(res);
            // navigate("/home");
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => {
        toast.error(`${error.code.toString().split("/")[1]}`);
      });
  };

  useEffect(() => {
    if (firebase.isLoggedin) {
      navigate("/home");
    }
  }, [firebase.isLoggedin, navigate]);
  return (
    <div className="container mt-3 width-50">
      <Form onSubmit={handelSubmit} >
        <h1 className="text-center">Sign Up</h1>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
            className="border border-black"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter a valid email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            className="border border-black"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            className="border border-black"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <span>Already have an account? </span>
      <Link as={Link} to={'/'} variant="white border border-dark" >
        Login
      </Link>
      <Toaster />
    </div>
  );
};

export default SignUp;
