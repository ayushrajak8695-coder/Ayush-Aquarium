let cart = [];
let userProfile = null;

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function saveProfile() {
    const name = document.getElementById('acc-name').value;
    const phone = document.getElementById('acc-phone').value;
    const address = document.getElementById('acc-address').value;

    if (name && phone && address) {
        userProfile = { name, phone, address };
        alert("Account Saved!");
        closeModal('account-modal');
    } else {
        alert("Please fill Name, Phone, and Address!");
    }
}

function addToCart(name, price, btn) {
    const qty = parseInt(btn.parentElement.querySelector('.qty-input').value);
    cart.push({ name, price, qty });
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
    alert(name + " added!");
}

function renderCart() {
    const div = document.getElementById('cart-items');
    div.innerHTML = cart.map(i => `<p>${i.qty}x ${i.name} - ₹${i.price * i.qty}</p>`).join('') || "Empty";
}

function changeQty(btn, change) {
    const input = btn.parentElement.querySelector('.qty-input');
    let val = parseInt(input.value) + change;
    if (val >= 1) input.value = val;
}

function placeOrder() {
    if (!userProfile) {
        alert("You must create an account first!");
        closeModal('cart-modal');
        openModal('account-modal');
