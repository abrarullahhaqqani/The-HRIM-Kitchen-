import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from "./containers";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { FadeInOut } from "./animations";
import { Alert, MainLoader, CheckOutSuccess } from "./components";
import { setCartItems } from "./context/actions/cartAction";
// import { CheckOutSuccess } from "./components";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const firebaseAuth = getAuth(app);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          console.log(token);
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, [dispatch, firebaseAuth]);

  return (
    //tailwind css styling classes added below
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {/* this is the syntax of a JSX comment */}

      {/*
    The Routes component wraps all the route definitions. 
    The Route defines a route that matches the given path and renders the component given as element.
    */}
      {isLoading && (
        <motion.div
          {...FadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
