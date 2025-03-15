/*
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import myReducers from "./context/reducers";
// import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";

const myStore = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <Provider store={myStore}>
          <App />
        </Provider>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import myReducers from "./context/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const myStore = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = createTheme({
  direction: "ltr", // 👈 Ensuring 'direction' is defined
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap everything inside ThemeProvider */}
      <CssBaseline /> {/* Reset CSS for MUI */}
      <Router>
        <AnimatePresence>
          <Provider store={myStore}>
            <App />
          </Provider>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
