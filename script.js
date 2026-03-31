let cart = [];
let wishlist = [];

// Navigation
function showSection(id) {
    document.getElementById('home-section').style.display = id === 'home' ? 'block' : 'none';
    document.getElementById('contact-section').style.display = id === 'contact' ? 'block' : 'none';
    document.getElementById('order-info-section').style.display = id === 'order-info' ? 'block' : 'none';
}

function toggleSidebar(id) {
    let el = document.getElementById(id);
    el.style.width = el.style.width === "350px" ? "0" : "350px";
}

function changeQty(btn, amt) {
    let span = btn.parentElement.querySelector('.qty');
    let val = parseInt(span.innerText) + amt;
    if (val < 1) val = 1;
    span.innerText = val;
}

function searchProducts() {
    let term = document.getElementById('productSearch').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
}

// Cart
function addToCart(btn) {
    let card = btn.closest('.product-card');
    let name = card.getAttribute('data-name');
    let price = parseInt(card.getAttribute('data-price'));
    let qty = parseInt(card.querySelector('.qty').innerText);

    let existing = cart.find(i => i.name === name);
    if (existing) { existing.qty += qty; } else { cart.push({ name, price, qty }); }
    renderCart();
    alert("Added to cart!");
}

function renderCart() {
    let list = document.getElementById('cart-items-list');
    let total = 0; list.innerHTML = "";
    cart.forEach((item, i) => {
        total += item.price * item.qty;
        list.innerHTML += `<div style="padding:10px; border-bottom:1px solid #eee;">
            <b>${item.name}</b><br>₹${item.price} x ${item.qty}
            <button onclick="updateCartQty(${i}, 1)">+</button> <button onclick="updateCartQty(${i}, -1)">-</button>
        </div>`;
    });
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total-price').innerText = total;
}

function updateCartQty(idx, amt) {
    cart[idx].qty += amt;
    if (cart[idx].qty < 1) cart.splice(idx, 1);
    renderCart();
}

// Wishlist
function addToWishlist(name, price, img) {
    if (!wishlist.find(i => i.name === name)) {
        wishlist.push({name, price, img});
        renderWishlist();
        alert("Added to wishlist! ❤️");
    }
}

function renderWishlist() {
    let list = document.getElementById('wishlist-items-list');
    let countDisp = document.getElementById('wishlist-count');
    list.innerHTML = "";
    wishlist.forEach((i, idx) => {
        list.innerHTML += `<div style="padding:10px; border-bottom:1px solid #eee;">
            <img src="${i.img}" width="40"> <b>${i.name}</b><br>₹${i.price}
            <button onclick="removeFromWishlist(${idx})">Remove</button>
        </div>`;
    });
    countDisp.innerText = wishlist.length;
}

function removeFromWishlist(idx) {
    wishlist.splice(idx, 1);
    renderWishlist();
}

// Account & WhatsApp
function saveAccount() {
    let data = {
        name: document.getElementById('acc-name').value,
        phone: document.getElementById('acc-phone').value,
        address: document.getElementById('acc-address').value
    };
    localStorage.setItem('ayushAccount', JSON.stringify(data));
    alert("Details Saved!");
}

function sendToWhatsApp() {
    if (cart.length === 0) return alert("Cart is empty!");
    let user = JSON.parse(localStorage.getItem('ayushAccount'));
    if (!user || !user.name) return alert("Please save your account details first!");

    let msg = `Order from Ayush Aquarium:%0A%0A*Details:*%0AName: ${user.name}%0AAddress: ${user.address}%0A%0A*Items:*%0A`;
    cart.forEach(i => { msg += `- ${i.name} (x${i.qty}): ₹${i.price * i.qty}%0A`; });
    window.open(`https://wa.me/919641689471?text=${msg}`);
}

// Replace your old showDetails function with this one
function showDetails(name, price, img, description) {
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-img').src = img;
    
    // This line now uses the specific description you typed in the HTML
    document.getElementById('modal-desc').innerText = description; 
    
    document.getElementById('modal-price-display').innerText = "Price: ₹" + price;
    document.getElementById('details-modal').style.display = "block";
}
function closeDetails() { document.getElementById('details-modal').style.display = "none"; }