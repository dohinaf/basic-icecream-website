document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.navbar');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let animatedButton = document.querySelector('.animated-button');

    // Existing navbar, search, and cart functionality
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

    // Cart functionality
    let cart = [];

    window.addToCart = function(productName, price) {
        cart.push({ name: productName, price: price });
        displayCart();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        displayCart();
    }

    function displayCart() {
        const cartItemsElement = document.getElementById('cartItems');
        const totalElement = document.getElementById('total');
        let cartItemsHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            cartItemsHTML += `<li>${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></li>`;
            total += item.price;
        });

        if (cartItemsElement) cartItemsElement.innerHTML = cartItemsHTML;
        if (totalElement) totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.checkout = function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some items.');
            return;
        }

        alert('Redirecting to payment gateway...');
        cart = [];
        displayCart();
    }
});
