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

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');

  loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;

      // Retrieve data from local storage
      const existingUsersData = localStorage.getItem("users");

      if (existingUsersData) {
          const usersArray = JSON.parse(existingUsersData);
          let userFound = false;

          // Check if user exists
          for (const userData of usersArray) {
              if (email === userData.email && password === userData.password) {
                  userFound = true;
                  alert("Glad you are back for another treat!");
                  // Redirect to profile.html after a short delay
                  setTimeout(() => {
                      window.location.href = '../profile.html'; // Redirect to the profile page
                  }, 500); // 500 milliseconds delay
                  break; // Exit the loop once found
              }
          }

          if (!userFound) {
              alert("Invalid email or password!"); // Show alert only once
          }
      } else {
          alert("No user found. Please sign up first.");
          window.location.href = "../signup/signup.html"; // Redirect to signup page
      }

      // Clear the form fields after processing
      loginForm.reset();
  });
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
