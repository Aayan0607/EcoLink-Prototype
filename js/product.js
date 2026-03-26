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
    <div class="product-details">
        <div class="grid-cols-2">
            <div>
               <img src="${data.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg) 0 0 var(--radius-lg);">
            </div>
            <div class="product-info">
                <span class="card-category" style="margin-bottom:1rem; display:block;">${data.category}</span>
                <h1 style="font-size: 2.2rem; margin-bottom: 2rem;">${data.title}</h1>
                
                <div class="product-meta">
                   <div class="meta-item"><i class="ph-fill ph-map-pin meta-icon"></i> ${data.location}</div>
                   <div class="meta-item"><i class="ph-fill ph-package meta-icon"></i> ${data.quantity} ${data.unit}</div>
                </div>
                
                <div class="card-price" style="font-size: 2.5rem; color: var(--color-primary); margin-top: 1rem;">₹${data.price}</div>
                
                <div class="description-box">
                    <strong>About this byproduct:</strong><br>
                    ${data.description}
                </div>
                
                <button onclick="buyNow()" class="btn btn-primary btn-block" style="padding: 1rem; font-size:1.1rem; margin-top:1rem;"><i class="ph-bold ph-shopping-bag"></i> Proceed to Order</button>
            </div>
        </div>
    </div>
  `;
}

// Buy button
window.buyNow = () => {
  window.location.href = `checkout.html?id=${productId}`;
};

loadProduct();