import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("product");

async function loadProduct() {
  if (!productId) {
    container.innerHTML = "No product found";
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
    <img src="${data.imageUrl}" width="300"><br><br>
    <h2>${data.title}</h2>
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Description:</strong> ${data.description}</p>
    <p><strong>Quantity:</strong> ${data.quantity} ${data.unit}</p>
    <p><strong>Price:</strong> ₹${data.price}</p>
    <p><strong>Location:</strong> ${data.location}</p>
  `;
}

// Buy button
window.buyNow = () => {
  window.location.href = `checkout.html?id=${productId}`;
};

loadProduct();