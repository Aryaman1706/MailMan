import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyC2gh8A3PNdZifvZvlJ1iHfp67SuLEqWQk",
  authDomain: "av-mailer-01.firebaseapp.com",
  projectId: "av-mailer-01",
  storageBucket: "av-mailer-01.appspot.com",
  messagingSenderId: "636619018011",
  appId: "1:636619018011:web:0c03f6c72f8f34d51b4dbe",
  measurementId: "G-E9RSVDY5FV",
});

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
