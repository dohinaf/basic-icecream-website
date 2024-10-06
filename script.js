document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.navbar');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let myOrderContainer = document.querySelector('.my-order-container');
    const applyFilterButton = document.getElementById('apply-filter');
    const priceFilter = document.getElementById('price-filter');
    const flavorFilter = document.getElementById('flavor-filter');
    const menuItems = document.querySelectorAll('.menu .box');

    applyFilterButton.addEventListener('click', filterItems);

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        cartItem.classList.toggle('active');
        myOrderContainer.classList.remove('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };

    document.querySelector('#my-order-btn').onclick = () => {
        myOrderContainer.classList.toggle('active');//Order container shown
        cartItem.classList.remove('active');
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

    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };
    function filterItems() {
        const selectedPrice = priceFilter.value;
        const searchFlavor = flavorFilter.value.toLowerCase();

        menuItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const flavor = item.querySelector('h3').textContent.toLowerCase();
            let showItem = true;

            // Price filter
            if (selectedPrice !== 'all') {
                if (selectedPrice === 'under-15' && price >= 15) showItem = false;
                if (selectedPrice === '15-20' && (price < 15 || price > 20)) showItem = false;
                if (selectedPrice === 'over-20' && price <= 20) showItem = false;
            }

            // Flavor filter
            if (searchFlavor && !flavor.includes(searchFlavor)) showItem = false;

            item.style.display = showItem ? 'block' : 'none';
        });
    }
});

// Array to store cart items
let cart = [];

let wishlist = [];


document.addEventListener('DOMContentLoaded', () => {
    // ... existing event listeners ...

    // Filter functionality
    const applyFilterButton = document.getElementById('apply-filter');
    const priceFilter = document.getElementById('price-filter');
    const flavorFilter = document.getElementById('flavor-filter');
    const menuItems = document.querySelectorAll('.menu .box');

    applyFilterButton.addEventListener('click', filterItems);

    function filterItems() {
        const selectedPrice = priceFilter.value;
        const searchFlavor = flavorFilter.value.toLowerCase();

        menuItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const flavor = item.querySelector('h3').textContent.toLowerCase();
            let showItem = true;

            // Price filter
            if (selectedPrice !== 'all') {
                if (selectedPrice === 'under-15' && price >= 15) showItem = false;
                if (selectedPrice === '15-20' && (price < 15 || price > 20)) showItem = false;
                if (selectedPrice === 'over-20' && price <= 20) showItem = false;
            }

            // Flavor filter
            if (searchFlavor && !flavor.includes(searchFlavor)) showItem = false;

            item.style.display = showItem ? 'block' : 'none';
        });
    }
});

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




 


// Function to add items to the cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (!existingItem) {
        // Add the product to the cart
        cart.push({ name: productName, price: price });
        alert(`Product ${productName} added to cart`); // Notify the user
        displayCart(); // Update the cart display

        // Show notification tooltip
        const notification = document.getElementById('notification-tooltip');
        notification.classList.add('show');

        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
        
        // Optionally remove item from wishlist if necessary
        const wishlistIndex = wishlist.findIndex(item => item.name === productName);
        if (wishlistIndex !== -1) {
            removeFromWishlist(wishlistIndex);
        }
    } else {
        alert(`${productName} is already in your cart!`); // Alert if the item is already in the cart
    }
}




// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    displayCart(); // Update the cart display
}

// Function to display cart items and calculate total
function displayCart() {
    const cartItemsElement = document.getElementById('cartItems'); // Container for cart items
    const totalElement = document.getElementById('total'); // Element for displaying total price
    let cartItemsHTML = '';
    let total = 0;

    // Iterate through the cart array to build the HTML for each item
    cart.forEach((item, index) => {
        cartItemsHTML += `
            <li>
                ${item.name} - $${item.price.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>`;
        total += item.price; // Accumulate total price
    });

    cartItemsElement.innerHTML = cartItemsHTML; // Insert the built HTML into the cart
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Display the total
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
// function checkout() {
//     if (cart.length === 0) {
//         alert('Your cart is empty. Please add some items.');
//         return;
//     }

//     //redirect to a payment gateway or show a message
//     alert('Redirecting to payment gateway...');

//     // After payment, you can clear the cart
//     cart = [];
//     displayCart();
// }


function showSection(section) {
    // Hide all sections
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.blogs').style.display = 'none';
    document.querySelector('.cart-items-container').style.display = 'none'; 
    document.getElementById('payment-section').style.display = 'none'; 

    // Show the selected section
    document.querySelector(`.${section}`).style.display = 'block';
}

// Example event listeners for navigation links
// document.getElementById('home-link').addEventListener('click', () => showSection('home'));
// document.getElementById('about-link').addEventListener('click', () => showSection('about'));
// document.getElementById('menu-link').addEventListener('click', () => showSection('menu'));
// document.getElementById('blogs-link').addEventListener('click', () => showSection('blogs'));



function checkout() {

    
    // Hide other sections
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.blogs').style.display = 'none';

    // Hide the cart section
    document.querySelector('.cart-items-container').style.display = 'none';
    
     // Display the payment section
     const paymentSection = document.getElementById('payment-section');
     paymentSection.style.display = 'block';
    
    // Update order summary dynamically 
    updateOrderSummary();
}

document.getElementById('checkout-button').addEventListener('click', checkout);

function updateOrderSummary() {
    // Fetch order items and total from cart 
    const totalItems = 3; 
    const totalPrice = 45.99; 

    document.getElementById('order-items').textContent = `Total Items: ${totalItems}`;
    document.getElementById('order-total').textContent = `Total Price: $${totalPrice}`;
}

// Payment method selection logic
document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
    input.addEventListener('change', function() {
        if (this.value === 'credit-card') {
            document.getElementById('card-details').style.display = 'block';
        } else {
            document.getElementById('card-details').style.display = 'none';
        }
    });
});

function togglePaymentDetails() {
    const cardDetails = document.getElementById('card-details');
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'credit-card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

function showPaymentDetails() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const cardDetails = document.getElementById('card-details');
    const paypalDetails = document.getElementById('paypal-details');
    const codMessage = document.getElementById('cod-message'); 

    // Show/hide payment details based on selected payment method
    if (paymentMethod === 'credit-card') {
        cardDetails.style.display = 'block'; 
        paypalDetails.style.display = 'none'; 
        codMessage.style.display = 'none'; 
    } else if (paymentMethod === 'paypal') {
        cardDetails.style.display = 'none'; 
        paypalDetails.style.display = 'block'; 
        codMessage.style.display = 'none'; 
    } else if (paymentMethod === 'cod') {
        cardDetails.style.display = 'none'; 
        paypalDetails.style.display = 'none';
        codMessage.style.display = 'block'; 
    }
}
// review part contributed



function confirmPayment() {
    alert("Payment confirmed! Your order is being processed.");
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


//function for annimation on about us
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        const aboutTop = aboutSection.getBoundingClientRect().top;

        if (aboutTop < triggerBottom) {
            aboutSection.classList.add('animate');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); 
});


document.addEventListener('DOMContentLoaded', () => {
    let loginModal = document.getElementById('login-modal');
    let signupModal = document.getElementById('signup-modal');
    let loginBtn = document.getElementById('login-btn');
    let signupBtn = document.getElementById('signup-btn');
    let closeLogin = document.getElementById('close-login');
    let closeSignup = document.getElementById('close-signup');

    // Show login modal
    loginBtn.onclick = () => {
        loginModal.style.display = 'flex';
        signupModal.style.display = 'none'; // Ensure signup modal is hidden
    };

    // Show signup modal
    signupBtn.onclick = () => {
        signupModal.style.display = 'flex';
        loginModal.style.display = 'none'; // Ensure login modal is hidden
    };

    // Close login modal
    closeLogin.onclick = () => {
        loginModal.style.display = 'none';
    };

    // Close signup modal
    closeSignup.onclick = () => {
        signupModal.style.display = 'none';
    };

    // Close modal if clicked outside the modal content
    window.onclick = (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        } else if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    };
});
