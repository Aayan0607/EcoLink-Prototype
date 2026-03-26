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
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem;">
        <img src="${data.imageUrl || 'https://via.placeholder.com/150'}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm);" alt="Product">
        <div>
           <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${data.title}</h3>
           <div style="color: var(--color-text-muted); font-size: 0.875rem;">Qty: ${data.quantity} ${data.unit}</div>
        </div>
    </div>
    
    <div class="summary-item">
       <span>Subtotal</span>
       <span>₹${data.price}</span>
    </div>
    <div class="summary-item">
       <span>Platform Fee</span>
       <span>₹0</span>
    </div>
    <div class="summary-total">
       <span>Total amount</span>
       <span style="color: var(--color-primary);">₹${data.price}</span>
    </div>
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