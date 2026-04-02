let cart = [];
let wishlist = [];
let userProfile = null; // Stores user data locally

// --- 1. MODAL SYSTEM ---
function openModal(id) { 
    document.getElementById(id).style.display = 'block'; 
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}

// --- 2. SEARCH SYSTEM ---
document.getElementById('product-search').addEventListener('input', function(e) {
    let term = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        let name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});

// --- 3. ACCOUNT SYSTEM ---
function saveProfile() {
    const name = document.getElementById('acc-name').value;
    const phone = document.getElementById('acc-phone').value;
    const address = document.getElementById('acc-address').value;

    if (name && phone && address) {
        userProfile = { name, phone, address };
        alert("Profile Saved Successfully!");
        closeModal('account-modal');
    } else {
        alert("Please fill in Name, Phone, and Address to continue!");
    }
}

// --- 4. QUANTITY SYSTEM ---
function changeQty(btn, change) {
    const input = btn.parentElement.querySelector('.qty-input');
    let val = parseInt(input.value) + change;
    if (val >= 1) input.value = val;
}

// --- 5. CART & WISHLIST SYSTEM ---
function addToCart(name, price, btn) {
    const qtyInput = btn.parentElement.querySelector('.qty-input');
    const qty = parseInt(qtyInput.value);
    cart.push({ name, price, qty });
    updateCounts();
    renderCart();
    alert(qty + " " + name + "(s) added to cart!");
}

function addToWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        updateCounts();
        renderWishlist();
        alert(name + " added to wishlist!");
    }
}

function updateCounts() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('wish-count').innerText = wishlist.length;
}

function renderCart() {
    let div = document.getElementById('cart-items');
    if (cart.length === 0) {
        div.innerHTML = "Your cart is empty.";
        return;
    }
    div.innerHTML = cart.map(i => `<p>${i.qty}x ${i.name} - ₹${i.price * i.qty}</p>`).join('');
}

function renderWishlist() {
    let div = document.getElementById('wishlist-items');
    div.innerHTML = wishlist.map(i => `<p>❤️ ${i}</p>`).join('') || "Empty";
}

// --- 6. VIEW DETAILS ---
function showDetails(name, info) {
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-info').innerText = info;
    openModal('details-modal');
}

// --- 7. WHATSAPP ORDER LOGIC (FIXED) ---
function placeOrder() {
    // Check if Cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Check if Account exists
    if (!userProfile) {
        alert("You have to make an account first!");
        closeModal('cart-modal');
        openModal('account-modal');
        return;
    }

    // Prepare WhatsApp Message
    let message = `*New Order from Ayush Aquarium*%0A`;
    message += `*Customer:* ${userProfile.name}%0A`;
    message += `*Phone:* ${userProfile.phone}%0A`;
    message += `*Address:* ${userProfile.address}%0A%0A`;
    message += `*Items:*%0A`;

    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (Qty: ${item.qty}) - ₹${item.price * item.qty}%0A`;
        total += item.price * item.qty;
    });

    message += `%0A*Total Amount: ₹${total}*`;

    // Final Alert then open WhatsApp
    alert("Order Placed!");
    const myNumber = "919641689471"; // Your specific contact
    const whatsappURL = `https://wa.me/${myNumber}?text=${message}`;
    
    window.open(whatsappURL, '_blank');

    // Clear Cart after success
    cart = [];
    updateCounts();
    closeModal('cart-modal');
}
