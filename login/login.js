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
  const existingUserData = localStorage.getItem("user");

  if (existingUserData) {
    const userData = JSON.parse(existingUserData); // Parse the JSON string back to an object

    // Check if email and password match what's stored in local storage
    if (email === userData.email && password === userData.password) {
      alert("Glad you are back for another treat!");
      // Redirect to index.html
      window.location.assign("../index.html");
    }

    if (email !== userData.email) {
      alert("Invalid email !!");
    }
    if (password !== userData.password) {
      alert("Invalid password !!");
    }
  } else {
    alert("No user found. Please sign up first.");
    window.location.assign("../signup/signup.html");
  }

  // Clear the form fields
  document.querySelector(".login-form").reset();
});
