import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("message").innerText = "Login successful!";
    
    // redirect
    window.location.href = "index.html";

  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
};

// SIGNUP
window.signup = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("message").innerText = "Account created!";
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
};