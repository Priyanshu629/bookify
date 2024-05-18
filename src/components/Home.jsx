
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Home = () => {
  const { user } = useFirebase();
  const firebase = useFirebase();
  const navigate = useNavigate();
  


  useEffect(() => {
    if (!firebase.isLoggedin) {
      navigate("/");
    }
  }, [firebase.isLoggedin, navigate]);

  return (
    <div className="container">
      <h1>Welcome {user?.displayName}</h1>
    </div>
  );
};

export default Home;
