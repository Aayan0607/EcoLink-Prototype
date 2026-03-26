import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Get product ID
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("productSummary");

async function loadProduct() {
  if (!productId) {
    container.innerHTML = "No product selected";
    return;
  }

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    container.innerHTML = "Product not found";
    return;
  }

  const data = docSnap.data();

  container.innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.imageUrl}" width="200"><br>
    <p>Price: ₹${data.price}</p>
    <p>Quantity: ${data.quantity} ${data.unit}</p>
  `;
}

// Fake order placement
window.placeOrder = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("You are not logged in. Please login again.");
    window.location.href = "login.html";
    return;
  }

  try {
    await addDoc(collection(db, "orders"), {
      productId: productId,
      buyerId: user.uid,
      createdAt: new Date()
    });

    document.getElementById("message").innerText = "Order placed successfully! 🎉";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);

  } catch (error) {
    console.error(error);
    document.getElementById("message").innerText = error.message;
  }
};
loadProduct();