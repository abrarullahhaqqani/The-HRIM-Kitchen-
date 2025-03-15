import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";

import {
  //alertSuccess//
  alertInfo,
  alertWarning,
} from "../context/actions/AlertActions";

//for method 1
// export const Login = () => {
//   return (
//     <div>login</div>
//   )
// }

//for method 2
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  /*
  const alert = useSelector((state) => state.user);
*/
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Please fill all the fields"));
    } else {
      if (password === confirmPassword) {
        setUserEmail("");
        setconfirmPassword("");
        setpassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        // console.log("Equal");
      } else {
        dispatch(alertWarning("Passwords do not match"));
      }
    }
  };
  // actions

  // reducer

  /// store globalised
  //// stores all details in the store

  /// dispatch and action

  ///
  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Passwords do not match"));
    }
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/*background image*/}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0 "
        alt=""
      />

      {/*content box*/}
      <div className="flex flex-col items-center bg-lightOverlay w-[30%]   h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        {/*Welcome section*/}
        <p className=" text-3xl text-red-500 font-bold">Welcome Back!</p>

        <p className=" text-xl -mt-2 text-textColor">
          {isSignUp ? "Sign Up " : "Sign in"}
        </p>

        {/* input section */}
        <div className=" w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder="Email here"
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder="Password"
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeholder="Confirm Password"
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setconfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p className="font-semibold text-2xl">
              Don't have an account :{/* friend operator ... */}
              <motion.button
                {...buttonClick}
                className="text-green-500 underline cursor-pointer bg-transparent"
                // // whileHover={{ scale: 1.5 }}
                // whileTap={{ scale: 0.9 }}
                onClick={() => setisSignUp(true)}
              >
                Sign Up here!
              </motion.button>
            </p>
          ) : (
            <p className="font-semibold text-2xl">
              Already have an account, Great :) {/* friend operator ... */}
              <motion.button
                {...buttonClick}
                className="text-green-500 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(false)}
              >
                Sign in here !
              </motion.button>
            </p>
          )}

          {/* Button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className=" w-full px-4 py-2 rounded-lg bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className=" w-full px-4 py-2 rounded-lg bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] bg-white rounded-md"></div>
          <p className="text-white text-2xl">OR</p>
          <div className="w-24 h-[1px] bg-white rounded-md"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-between px-28 py-2 gap-4 bg-lightOverlay backdrop:blur-sm cursor-pointer rounded-3xl hover:bg-gray-200 transition-all duration-150"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="font-semibold capitalize text-base text-headingColor">
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default Login;
