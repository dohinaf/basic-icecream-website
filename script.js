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

    // Animated button functionality
    if (animatedButton) {
        animatedButton.addEventListener('mouseenter', handleButtonMouseEffect);
        animatedButton.addEventListener('mouseleave', handleButtonMouseEffect);
    }

    function handleButtonMouseEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    }

    let myOrderContainer = document.querySelector('.my-order-container');

    document.querySelector('#my-order-btn').onclick = () => {
        myOrderContainer.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };
});

// Array to store cart items
let cart = [];

let wishlist = [];

// Function to add items to cart

let wishlistContainer = document.querySelector('.wishlist-container');

document.querySelector('#wishlist-btn').onclick = () => {
    wishlistContainer.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

function addToWishlist(productName, price) {
    const existingItem = wishlist.find(item => item.name === productName);
    if (!existingItem) {
        wishlist.push({ name: productName, price: price });
        displayWishlist();
    } else {
        alert(`${productName} is already in your wishlist!`);
    }
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    displayWishlist();
}

function displayWishlist() {
    const wishlistItemsElement = document.getElementById('wishlistItems');
    const wishlistPageElement = document.getElementById('wishlist-items');
    let wishlistItemsHTML = '';

    wishlist.forEach((item, index) => {
        wishlistItemsHTML += `
            <li>
                ${item.name} - $${item.price.toFixed(2)}
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                <button onclick="removeFromWishlist(${index})">Remove</button>
            </li>`;
    });

    wishlistItemsElement.innerHTML = wishlistItemsHTML;
}

function clearWishlist() {
    wishlist = [];
    displayWishlist();
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    displayCart();
    //remove item from wishlist
    const wishlistIndex = wishlist.findIndex(item => item.name === productName);
    if (wishlistIndex !== -1) {
        removeFromWishlist(wishlistIndex);
    }
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
    displayOrder();
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

function displayOrder() {
    const orderDetailsElement = document.getElementById('order-details');
    if (cart.length === 0) {
        orderDetailsElement.innerHTML = '<p>No active order.</p>';
        return;
    }

    let orderHTML = '<h3>Current Order:</h3><ul>';
    cart.forEach((item, index) => {
        orderHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });
    orderHTML += '</ul>';

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;

    orderDetailsElement.innerHTML = orderHTML;
}

function trackOrder() {
    if (cart.length === 0) {
        alert('No active order to track.');
        return;
    }
    // Simulating order tracking
    alert('Your order is being prepared and will be delivered soon!');
}

function editOrder() {
    if (cart.length === 0) {
        alert('No active order to edit.');
        return;
    }
    // For simplicity, we'll just clear the cart and allow the user to add items again
    if (confirm('Do you want to clear your current order and start over?')) {
        cart = [];
        displayCart();
        displayOrder();
        alert('Your order has been cleared. You can now add new items.');
    }
}
displayOrder();