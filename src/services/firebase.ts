import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDxX1Ffm-qD9Av_dZJL-XkVwGxq_uLTJYY",
  authDomain: "instacool-5c2e4.firebaseapp.com",
  databaseURL: "https://instacool-5c2e4.firebaseio.com",
  projectId: "instacool-5c2e4",
  storageBucket: "instacool-5c2e4.appspot.com",
  messagingSenderId: "173286290811",
  appId: "1:173286290811:web:c44c784299ca06bb8279de",
  measurementId: "G-7GRDQK7QDR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth()
export const dd = firebase.firestore()
export const storage = firebase.storage()