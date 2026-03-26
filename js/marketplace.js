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
    <div class="card-img-wrapper">
      <img src="${data.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}" alt="${data.title}">
    </div>
    <div class="card-body">
      <span class="card-category">${data.category || 'Uncategorized'}</span>
      <h3 class="card-title">${data.title}</h3>
      <div class="card-location">
         <i class="ph ph-map-pin"></i> ${data.location || 'Unknown'}
      </div>
      <div class="card-footer">
        <span class="card-price">₹${data.price}</span>
        <span class="card-quantity">per ${data.unit || 'unit'}</span>
      </div>
    </div>
  </div>
`;
  });
}

// Navigate to product page
window.goToProduct = (id) => {
  window.location.href = `product.html?id=${id}`;
};

loadProducts();