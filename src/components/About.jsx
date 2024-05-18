import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const About = () => {
    const firebase=useFirebase()
    const navigate=useNavigate()

    useEffect(() => {
        if (firebase.isLoggedin) {
          navigate("/home");
        }
      }, [firebase.isLoggedin, navigate]);
    
  return (
    <div className="container">
      <h1>About Bookify</h1>
      <p className="text-weight-bold text-success">Bookify is an e-commerce website. Here people can buy different types of  books from different category.</p>

      <p>Right Now this website is under development , Only development of Login and Registration functionality has completed. For now you can test this website by simply making an account and login.</p>

    </div>
  )
}

export default About
