let cart = [];
let wishlist = [];

// --- MODAL CONTROLS ---
function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// --- 8. VIEW DETAILS ---
function showDetails(name, info) {
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-info').innerText = info;
    openModal('details-modal');
}

// --- 3. SEARCH LOGIC ---
document.getElementById('product-search').addEventListener('input', function(e) {
    let term = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        let name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});

// --- 5. QUANTITY LOGIC ---
function changeQty(btn, change) {
    const input = btn.parentElement.querySelector('.qty-input');
    let val = parseInt(input.value) + change;
    if (val >= 1) input.value = val;
}

// --- 6 & 7. CART & WISHLIST ---
function addToCart(name, price, btn) {
    const qty = parseInt(btn.parentElement.querySelector('.qty-input').value);
    cart.push({ name, price, qty });
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
    alert(qty + " " + name + " added to cart!");
}

function addToWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        document.getElementById('wish-count').innerText = wishlist.length;
        renderWishlist();
        alert(name + " added to wishlist!");
    }
}

function renderCart() {
    let div = document.getElementById('cart-items');
    div.innerHTML = cart.map(i => `<p>${i.qty}x ${i.name} - ₹${i.price * i.qty}</p>`).join('') || "Empty";
}

function renderWishlist() {
    let div = document.getElementById('wishlist-items');
    div.innerHTML = wishlist.map(i => `<p>❤️ ${i}</p>`).join('') || "Empty";
}
