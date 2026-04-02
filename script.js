let cart = [];
let wishlist = [];
let userProfile = null;

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Search Functionality
document.getElementById('product-search').addEventListener('input', function(e) {
    let term = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        let name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});

// Account Logic
function saveProfile() {
    const name = document.getElementById('acc-name').value;
    const phone = document.getElementById('acc-phone').value;
    const addr = document.getElementById('acc-address').value;

    if (name && phone && addr) {
        userProfile = { name, phone, addr };
        alert("Account Details Saved!");
        closeModal('account-modal');
    } else {
        alert("Please fill in Name, Phone, and Address!");
    }
}

// Product Logic
function changeQty(btn, change) {
    let input = btn.parentElement.querySelector('.qty-input');
    let val = parseInt(input.value) + change;
    if (val >= 1) input.value = val;
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
        renderWishlist();
        alert(name + " added to wishlist!");
    }
}

function renderCart() {
    document.getElementById('cart-items').innerHTML = cart.map(i => `<p>${i.qty}x ${i.name} - ₹${i.price * i.qty}</p>`).join('') || "Empty";
}

function renderWishlist() {
    document.getElementById('wish-items').innerHTML = wishlist.map(i => `<p>❤️ ${i}</p>`).join('') || "Empty";
}

// Order via WhatsApp
function placeOrder() {
    if (cart.length === 0) return alert("Cart is empty!");

    if (!userProfile) {
        alert("Please make an account first!");
        closeModal('cart-modal');
        openModal('account-modal');
        return;
    }

    let text = `Order from Ayush Aquarium:%0A- Name: ${userProfile.name}%0A- Address: ${userProfile.addr}%0A%0AItems:%0A`;
    let total = 0;
    cart.forEach(i => {
        text += `- ${i.name} (x${i.qty}): ₹${i.price * i.qty}%0A`;
        total += i.price * i.qty;
    });
    text += `%0ATotal: ₹${total}`;

    window.open(`https://wa.me/919641689471?text=${text}`, '_blank');
        }
