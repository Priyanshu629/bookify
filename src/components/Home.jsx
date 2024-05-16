import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user } = useFirebase();
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleDelete = () => {
    // console.log(currentuser);
    firebase
      .deleteAccount()
      .then(() => {
        console.log("User delete");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <Button onClick={handleDelete}>Delete Account</Button>
    </div>
  );
};

export default Home;
