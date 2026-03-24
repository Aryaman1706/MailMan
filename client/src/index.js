import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

// Connect to Firebase emulators for development
if (process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
