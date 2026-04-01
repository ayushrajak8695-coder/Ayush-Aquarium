let cart = [];
let wishlist = [];

// Toggle the side menu
function toggleMenu() {
    let menu = document.getElementById('side-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Modal management
function openModal(id) {
    document.getElementById(id).style.display = 'block';
    if(id === 'side-menu') toggleMenu();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Fix View Details
function showDetails(name, info) {
    alert(name + ": " + info);
}

// Cart Logic
function addToCart(name, price) {
    cart.push({name, price});
    updateCounts();
    renderCart();
    alert(name + " added to cart!");
}

function updateCounts() {
    document.getElementById('cart-count').innerText = cart.length;
}

function renderCart() {
    let cartDiv = document.getElementById('cart-items');
    if(cart.length === 0) {
        cartDiv.innerHTML = "No items in cart.";
    } else {
        cartDiv.innerHTML = cart.map((item, index) => 
            `<div style="display:flex; justify-content:space-between;">
                <span>${item.name}</span> <span>₹${item.price}</span>
            </div>`
        ).join('');
    }
}

function placeOrder() {
    if(cart.length === 0) return alert("Cart is empty!");
    alert("Order Placed Successfully! We will contact you soon.");
    cart = [];
    updateCounts();
    closeModal('cart-modal');
}
