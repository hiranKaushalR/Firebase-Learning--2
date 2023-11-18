import React, { useState, useEffect } from "react";
import { auth, googleAuth } from "../Config/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function Login(props) {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.setUser(authUser);
      } else {
        props.setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function GoogleAuth() {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      props.setUser(result.user);
      props.setShowLoginPanel (false)
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      console.log(`Logged out from ${auth?.currentUser?.email}`);
      await signOut(auth);
      props.setUser(null);
      props.setShowLoginPanel (false)
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="login-panel--div animate__animated animate__zoomIn">
      {props.user ? (
        <div>
          <img
            referrerPolicy="no-referrer"
            src={props.user.photoURL}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <p className="display-name">Welcome, {props.user.displayName}</p>
          <button className="login-panel--logout" onClick={logOut}>
            Log Out
          </button>
        </div>
      ) : (
        <button className="login-panel--google" onClick={GoogleAuth}>
          Log In With Google
        </button>
      )}
    </div>
  );
}

export default Login;
