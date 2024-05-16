import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import toast from "react-hot-toast";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  // const []
  

  const signupUserWithEmailAndPassword = (email, password) => {
    

    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    
      
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        
      } else {
        setUser(null);
        setIsLoggedIn(false);
        
      }
    });
  }, []);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  const logOut = () => {
    toast.success("Logged out successfully");
    return signOut(firebaseAuth);
  };
  const deleteAccount = () => {
    
    return deleteUser(firebaseAuth.currentUser);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        setIsLoggedIn,
        setUser,
        logOut,
        isLoggedin,
        user,
        deleteAccount,
        
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
