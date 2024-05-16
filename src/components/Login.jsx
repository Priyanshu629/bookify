import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const SignUp = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handelLogin = (e) => {
    e.preventDefault();
    firebase
      .signinUserWithEmailAndPassword(email, password)
      .then((response) => {
        navigate("/home");
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
      <h2 id="msg"></h2>
      <Form onSubmit={handelLogin}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {firebase.loading ? "Loading..." : "Login"}
        </Button>
      </Form>
      <h3 className="mt-3 ">Or</h3>
      <Button variant="danger" onClick={handelLoginWithGoogle}>
        Signin with google
      </Button>
      <Toaster />
    </div>
  );
};

export default SignUp;
