// Smooth card hover effect
const card = document.getElementById("signup-box");

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

// Form validation
const handleSignUpForm = (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Username validation
  if (username.length < 3) {
    alert('Username must be at least 3 characters long.');
    return;
  }

  // Email validation using regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Password validation criteria
  const passwordMinLength = 8;
  const passwordMaxLength = 16;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[$_]/.test(password);

  if (password.length < passwordMinLength || password.length > passwordMaxLength) {
    alert(`Password must be between ${passwordMinLength} and ${passwordMaxLength} characters.`);
    return;
  }
  if (!hasUpperCase) {
    alert('Password must contain at least one uppercase letter.');
    return;
  }
  if (!hasLowerCase) {
    alert('Password must contain at least one lowercase letter.');
    return;
  }
  if (!hasSpecialChar) {
    alert('Password must contain at least one special character ($ or _).');
    return;
  }

  alert('Form submitted successfully!');
  document.getElementById('signupForm').reset();  // Clear the form fields
  window.location.assign("../profile.html");  // Redirect to profile page
};

// Attach form submit event listener
document.getElementById('signupForm').addEventListener('submit', handleSignUpForm);
