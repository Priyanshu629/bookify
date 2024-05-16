import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user } = useFirebase();
  const firebase = useFirebase();
  const navigate = useNavigate();

  

  const logOut = () => {
    firebase.logOut();
    navigate("/");
  };

  useEffect(() => {
    if (!firebase.isLoggedin) {
      navigate("/");
    }
  }, [firebase.isLoggedin, navigate]);

  return (
    <div className="container">
      <h1>Welcome {user?.displayName}</h1>
      <Button variant="danger" onClick={logOut}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
