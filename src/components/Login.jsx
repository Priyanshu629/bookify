import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";



const SignUp = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelLogin = (e) => {
    setEmail("");
    setPassword("");
    e.preventDefault();
    firebase
      .signinUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert("Login Successfull !! Press 'OK' ");
        
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          `${
            error.code.split("/")[1] === "invalid-credential"
              ? "Invalid email or password"
              : error.code.split("/")[1]
          }`
        );
      });
  };

  const handelLoginWithGoogle = async () => {
    const result = await firebase.signinWithGoogle();

    navigate("/home");
  };

  useEffect(() => {
    if (firebase.isLoggedin) {
      navigate("/home");
    }
  }, [firebase.isLoggedin, navigate]);

  return (
    <div className="container mt-3">
      
      <Form onSubmit={handelLogin}>
        <h1 className="text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-black"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-black"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h5 className="mt-3 ">Or</h5>
      <Button variant="white border border-dark" onClick={handelLoginWithGoogle}>
      <FcGoogle /> Login with google
      </Button><br /><br />

       <span>Do not have an account? </span>
      <Link as={Link} to={'/signup'} variant="white border border-dark" >
        Sign-Up
      </Link>
      <Toaster />
    </div>
  );
};

export default SignUp;
