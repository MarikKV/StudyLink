import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDHAQfudekbBrh4WeEyhi9XZ4tPyuU-nHQ",
    authDomain: "studylink-62a6b.firebaseapp.com",
    databaseURL: "https://studylink-62a6b.firebaseio.com",
    projectId: "studylink-62a6b",
    storageBucket: "studylink-62a6b.appspot.com",
    messagingSenderId: "710063505158",
    appId: "1:710063505158:web:4573c8d89733fc2025e887"
  };

  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
