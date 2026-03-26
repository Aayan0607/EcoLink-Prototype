import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("products");

async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const id = doc.id;

    container.innerHTML += `
  <div class="card" onclick="goToProduct('${id}')">
    <img src="${data.imageUrl}" width="200"><br>
    <h3>${data.title}</h3>
    <p>Category: ${data.category}</p>
    <p>Price: ₹${data.price}</p>
    <p>Location: ${data.location}</p>
  </div>
  <hr>
`;
  });
}

// Navigate to product page
window.goToProduct = (id) => {
  window.location.href = `product.html?id=${id}`;
};

loadProducts();