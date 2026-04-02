let cart = [];
let wishlist = [];
let userProfile = null;

// --- MODAL CONTROLS ---
function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// --- SEARCH LOGIC ---
document.getElementById('product-search').addEventListener('input', (e) => {
    let term = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        let name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});

// --- ACCOUNT LOGIC ---
function saveProfile() {
    const name = document.getElementById('acc-name').value;
    const phone = document.getElementById('acc-phone').value;
    const addr = document.getElementById('acc-address').value;

    if (name && phone && addr) {
        userProfile = { name, phone, addr };
        alert("Account Created Successfully!");
        closeModal('account-modal');
    } else {
        alert("Please fill Name, Phone, and Address!");
    }
}

// --- FUNCTIONALITY ---
function changeQty(btn, n) {
    let inp = btn.parentElement.querySelector('.qty-input');
    let v = parseInt(inp.value) + n;
    if (v >= 1) inp.value = v;
}

function showDetails(name, info) {
    document.getElementById('det-name').innerText = name;
    document.getElementById('det-text').innerText = info;
    openModal('details-modal');
}

function addToCart(name, price, btn) {
    let qty = parseInt(btn.parentElement.querySelector('.qty-input').value);
    cart.push({ name, price, qty });
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
    alert(name + " added to cart!");
}

function addToWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        document.getElementById('wish-count').innerText = wishlist.length;
        alert(name + " added to wishlist!");
    }
}

function renderCart() {
    let div = document.getElementById('cart-items');
    div.innerHTML = cart.map(i => `<p>${i.qty}x ${i.name} - ₹${i.price * i.qty}</p>`).join('') || "Empty";
}

// --- WHATSAPP ORDER LOGIC ---
function placeOrder() {
    if (cart.length === 0) return alert("Cart is empty!");

    if (!userProfile) {
        alert("Please make an account first!");
        closeModal('cart-modal');
        openModal('account-modal');
        return;
    }

    let msg = `Order from Ayush Aquarium:%0A- Name: ${userProfile.name}%0A- Address: ${userProfile.addr}%0A%0AItems:%0A`;
    let total = 0;
    cart.forEach(i => {
        msg += `- ${i.name} (x${i.qty}): ₹${i.price * i.qty}%0A`;
        total += i.price * i.qty;
    });
    msg += `%0ATotal: ₹${total}`;

    window.open(`https://wa.me/919641689471?text=${msg}`, '_blank');
    }
