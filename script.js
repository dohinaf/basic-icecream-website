document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.navbar');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        cartItem.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };
});

// Array to store cart items
let cart = [];

// Function to add items to cart
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    displayCart();
}

// Function to remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Function to display cart items and calculate total
function displayCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const totalElement = document.getElementById('total');
    let cartItemsHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartItemsHTML += `<li>${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></li>`;
        total += item.price;
    });

    cartItemsElement.innerHTML = cartItemsHTML;
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to simulate checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items.');
        return;
    }

    //redirect to a payment gateway or show a message
    alert('Redirecting to payment gateway...');

    // After payment, you can clear the cart
    cart = [];
    displayCart();
}


											
