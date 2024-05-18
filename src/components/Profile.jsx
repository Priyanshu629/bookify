import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useFirebase();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const storage = getStorage(firebase.firebaseApp);

  const removePic = () => {
    const delRef = ref(storage, `uploads/images/${user?.email}`);
    deleteObject(delRef)
      .then(async (result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImage = () => {
    if(file===""){
      return
    }
    setFile("")
    const storageRef = ref(storage, `uploads/images/${user?.email}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("uploaded");
        const path = snapshot.ref._location.path_.toString();
        getDownloadURL(ref(storage, path))
          .then((url) => {
            const user = getAuth(firebase.firebaseApp).currentUser;

            updateProfile(user, {
              photoURL: url,
            })
              .then((res) => {
                alert('Photo updated successfully')
                window.location.reload()
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAccount = () => {
    removePic();
    firebase
      .deleteAccount()
      .then(() => {
        alert("Account Deleted Successfull !! Press 'Ok' ");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
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
    <div className="container mt-3">
      
      <div className="img mb-3">
        <img
          src={
            user?.photoURL === null
              ? "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"
              : user?.photoURL
          }
          alt=""
        />
      </div>
      <span>Update image : </span>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button className="mt-2" variant="primary" onClick={uploadImage}>
        Update
      </Button>

      <div className="container mt-2">
        <p>Name : {user?.displayName}</p>
        <p>Email : {user?.email}</p>
      </div>
      <Button className="m-3" variant="danger" onClick={logOut}>
        Logout
      </Button>
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  );
};

export default Profile;
