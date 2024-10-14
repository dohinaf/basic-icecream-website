// Function to add hover effect for tilting the card
function addHoverEffect(card) {
  card.addEventListener("mousemove", function (e) {
    const cardRect = card.getBoundingClientRect();
    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;

    // Determine which side the mouse is closest to
    const topSide = mouseY;
    const bottomSide = cardRect.height - mouseY;
    const leftSide = mouseX;
    const rightSide = cardRect.width - mouseX;

    // Find the minimum distance to any side
    const minDistance = Math.min(topSide, bottomSide, leftSide, rightSide);

    // Reset transform first
    card.style.transform = "perspective(1000px)";

    // Add transformation based on side
    if (minDistance === topSide) {
      card.style.transform += " translateY(-10px) rotateX(-5deg)";
    } else if (minDistance === bottomSide) {
      card.style.transform += " translateY(10px) rotateX(5deg)";
    } else if (minDistance === leftSide) {
      card.style.transform += " translateX(-10px) rotateY(-5deg)";
    } else if (minDistance === rightSide) {
      card.style.transform += " translateX(10px) rotateY(5deg)";
    }
  });

  card.addEventListener("mouseleave", function () {
    // Reset the card when the cursor leaves
    card.style.transform = "perspective(1000px)";
  });
}
// Sweet alert
function showNotification(message) {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 2000
  });
}

function showNotificationError(message){
  Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
}

// Add hover effect to both login and signup cards
const loginCard = document.getElementById("login-box");
const signupCard = document.getElementById("signup-box");

if (loginCard) {
  addHoverEffect(loginCard);
}

if (signupCard) {
  addHoverEffect(signupCard);
}
document.querySelector(".login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const email = document.querySelector('.login-form input[type="email"]').value;
  const password = document.querySelector(
    '.login-form input[type="password"]'
  ).value;

  // Retrieve data from local storage
  const existingUsersData = localStorage.getItem("users");

  if (existingUsersData) {
    const usersArray = JSON.parse(existingUsersData); // Parse the JSON string back to an array of objects
    let userFound = false; // Flag to track if user is found

    // Loop through users and check if any match the input credentials
    usersArray.forEach((userData) => {
      if (email === userData.email && password === userData.password) {
        userFound = true;
        // alert("Glad you are back for another treat!");
        showNotification("Glad you are back for another treat!");
        // Redirect to index.html
        window.location.assign("../index.html");
      }
    });

    if (!userFound) {
      // If no matching user is found
      // alert("Invalid email or password!");
      showNotificationError("Invalid email or password!");
    }
  } else {
    // If no users found in local storage
    // alert("No user found. Please sign up first.");
    showNotificationError("No user found. Please sign up first.");
    setTimeout(() => {
      window.location.assign("../signup/signup.html");
  }, 5000);
  }

  // Clear the form fields
  document.querySelector(".login-form").reset();
});




// password toggle feature
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");
  
  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
  }
}