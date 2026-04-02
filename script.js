let cart = [];
let wishlist = [];
let profile = null;

// Modal Controls
function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Search Function
document.getElementById('search-input').addEventListener('input', function(e) {
    let term = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        let name = card.querySelector('.prod-name').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});

// Account Logic
function saveAccount() {
    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const address = document.getElementById('user-address').value;

    if (name && phone && address) {
        profile = { name, phone, address };
        alert("Account Saved Successfully!");
        closeModal('account-modal');
    } else {
        alert("Full Name, Phone, and Address are required!");
    }
}

// Product Helpers
function qty(btn, n) {
    let inp = btn.parentElement.querySelector('input');
    let v = parseInt(inp.value) + n;
    if (v >= 1) inp.value = v;
}

function showInfo(title, desc) {
    document.getElementById('detail-title').innerText = title;
    document.getElementById('detail-desc').innerText = desc;
    openModal('details-modal');
}

// Cart & Wishlist Logic
function addToCart(name, price, btn) {
    let count = parseInt(btn.parentElement.querySelector('input').value);
    cart.push({ name, price, count });
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    alert(name + " added to cart!");
}

function addToWish(name) {
    if(!wishlist.includes(name)) {
        wishlist.push(name);
        document.getElementById('wish-count').innerText = wishlist.length;
        alert(name + " added to wishlist!");
    }
}

function updateCartUI() {
    let list = document.getElementById('cart-list');
    list.innerHTML = cart.map(i => `<p>${i.count}x ${i.name} - ₹${i.price * i.count}</p>`).join('') || "Empty";
}

// Professional Ordering
function validateAndOrder() {
    if (cart.length === 0) return alert("Cart is empty!");

    if (!profile) {
        alert("You must make an account first before placing an order!");
        closeModal('cart-modal');
        openModal('account-modal');
        return;
    }

    let text = `*New Order: Ayush Aquarium*%0A*Customer:* ${profile.name}%0A*Address:* ${profile.address}%0A%0A*Items:*%0A`;
    let total = 0;
    cart.forEach(i => {
        text += `- ${i.name} (x${i.count}): ₹${i.price * i.count}%0A`;
        total += i.price * i.count;
    });
    text += `%0A*Total: ₹${total}*`;

    window.open(`https://wa.me/919641689471?text=${text}`, '_blank');
}
