import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyChx8sMjm7z9z5dWZ6JPaDlH3fuBt2ZYu8",
  authDomain: "av-mailer-396d7.firebaseapp.com",
  projectId: "av-mailer-396d7",
  storageBucket: "av-mailer-396d7.appspot.com",
  messagingSenderId: "76344468913",
  appId: "1:76344468913:web:7fa7d8e719b06c90edc990",
  measurementId: "G-2TLPKPBLSC",
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
