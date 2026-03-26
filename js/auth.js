import { db } from "./firebase.js";
import { doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    document.getElementById("message").innerText = "Account created! Redirecting...";

setTimeout(() => {
  window.location.href = "index.html";
}, 1500);
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
};

import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Logout
window.logout = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};