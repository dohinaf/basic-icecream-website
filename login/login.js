// Function to add hover effect for tilting the card
function addHoverEffect(card) {
  card.addEventListener("mousemove", function (e) {
    const cardRect = card.getBoundingClientRect();
    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;

    const topSide = mouseY;
    const bottomSide = cardRect.height - mouseY;
    const leftSide = mouseX;
    const rightSide = cardRect.width - mouseX;

    const minDistance = Math.min(topSide, bottomSide, leftSide, rightSide);
    card.style.transform = "perspective(1000px)";

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
    card.style.transform = "perspective(1000px)";
  });
}

const loginCard = document.getElementById("login-box");
if (loginCard) {
  addHoverEffect(loginCard);
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const existingUsersData = localStorage.getItem("users");

    if (existingUsersData) {
      const usersArray = JSON.parse(existingUsersData);
      let userFound = false;

      // Check if user exists in local storage
      for (const userData of usersArray) {
        if (email === userData.email && password === userData.password) {
          userFound = true;
          alert("Glad you are back for another treat!");

          setTimeout(() => {
            window.location.href = '../profile.html';  // Redirect to profile page
          }, 500);  // Delay of 500ms
          break;
        }
      }

      if (!userFound) {
        alert("Invalid email or password!");
      }
    } else {
      alert("No user found. Please sign up first.");
      window.location.href = "../signup/signup.html";  
    }

    loginForm.reset();  
  });
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
