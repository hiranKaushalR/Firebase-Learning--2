import React, { useEffect } from "react";
import { auth, googleAuth } from "../Config/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { google } from "../Assets";

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
    <div className="login-panel--div h-[71.2vh] flex justify-center items-center">
      {props.user ? (
        <div className="flex flex-col gap-6">
          <div className="flex justify-center items-center gap-4">
            <img
              referrerPolicy="no-referrer"
              src={props.user.photoURL}
              alt="Profile"
              className="w-[100px] rounded-full border-4 border-black"
            />
            <p className="display-name text-lg font-bold">Hello, {props.user.displayName}</p>
          </div>

          <button className="bg-red-700 px-4 py-1 text-lg font-bold rounded-md text-white" onClick={logOut} mx-auto>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <button className="login-panel--google flex justify-center items-center gap-6 shadow-md px-4 py-2 rounded-md hover:shadow-xl transition-all" onClick={GoogleAuth}>
            <img src={google} className="w-10 " />
            <p className="text-2xl font-bold ">Sign up with Google</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
