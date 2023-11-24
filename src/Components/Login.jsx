import React, { useEffect } from "react";
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
      props.setShowLoginPanel(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      console.log(`Logged out from ${auth?.currentUser?.email}`);
      await signOut(auth);
      props.setUser(null);
      props.setShowLoginPanel(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-panel--div animate__animated animate__backInRight animate__faster">
      {props.user ? (
        <div>
          <div className="profile-info">
            <img
            referrerPolicy="no-referrer"
            src={props.user.photoURL}
            alt="Profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%"}}
            className="profile-photo"
          />
          <p className="display-name">{props.user.displayName}</p>
          
          </div>
          
          <button className="login-panel--logout" onClick={logOut}>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <button className="login-panel--google" onClick={GoogleAuth}>
            <img src="https://firebasestorage.googleapis.com/v0/b/fir-test-2-fda42.appspot.com/o/Source%20Files%2Fgoogle.png?alt=media&token=c2959971-9796-479c-8495-6d97876e68d4" />
            <p>Sign up with Google</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
