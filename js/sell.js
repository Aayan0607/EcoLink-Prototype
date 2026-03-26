import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Upload product
window.uploadProduct = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in");
    window.location.href = "login.html";
    return;
  }

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const quantity = document.getElementById("quantity").value;
  const unit = document.getElementById("unit").value;
  const price = document.getElementById("price").value;
  const location = document.getElementById("location").value;
  const imageUrl = document.getElementById("imageUrl").value;

  try {
    await addDoc(collection(db, "products"), {
      title,
      category,
      description,
      quantity,
      unit,
      price,
      location,
      imageUrl,
      sellerId: user.uid,
      createdAt: new Date()
    });

    document.getElementById("message").innerText = "Product listed successfully!";

    // optional: redirect
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
};